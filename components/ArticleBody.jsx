import { Editor, getEventTransfer } from "slate-react";
import { Block, Value } from "slate";
import React from "react";
import initialValue from "../lib/initialValue.json";
import { isKeyHotkey } from "is-hotkey";
import imageExtensions from "image-extensions";
import isUrl from "is-url";
import { Button, Icon, Toolbar } from "./SlateComponents";
import { cx, css } from "emotion";
import { graphql, compose } from "react-apollo";
import {
  NewArticleMutation,
  ArticleQuery,
  UpdateArticleMutation
} from "../graphql/Article";
import dayjs from "dayjs";

import { MeQuery } from "../graphql/Author";

/**
 * A change helper to standardize wrapping links.
 *
 * @param {Editor} editor
 * @param {String} href
 */

function wrapLink(editor, href) {
  editor.wrapInline({
    type: "link",
    data: { href }
  });

  editor.moveToEnd();
}

/**
 * A change helper to standardize unwrapping links.
 *
 * @param {Editor} editor
 */

function unwrapLink(editor) {
  editor.unwrapInline("link");
}
/**
 * Define the default node type.
 *
 * @type {String}
 */

const DEFAULT_NODE = "paragraph";

/**
 * Define hotkey matchers.
 *
 * @type {Function}
 */

const isBoldHotkey = isKeyHotkey("mod+b");
const isItalicHotkey = isKeyHotkey("mod+i");
const isUnderlinedHotkey = isKeyHotkey("mod+u");
const isCodeHotkey = isKeyHotkey("mod+`");

/**
 * A function to determine whether a URL has an image extension.
 *
 * @param {String} url
 * @return {Boolean}
 */

function isImage(url) {
  return imageExtensions.includes(getExtension(url));
}

/**
 * A change function to standardize inserting images.
 *
 * @param {Editor} editor
 * @param {String} src
 * @param {Range} target
 */

function insertImage(editor, src, target) {
  if (target) {
    editor.select(target);
  }
  editor.insertBlock({
    type: "image",
    data: { src }
  });
}

/**
 * The editor's schema.
 *
 * @type {Object}
 */

const schema = {
  document: {
    last: { type: "paragraph" },
    normalize: (editor, { code, node, child }) => {
      switch (code) {
        case "last_child_type_invalid": {
          const paragraph = Block.create("paragraph");
          return editor.insertNodeByKey(node.key, node.nodes.size, paragraph);
        }
      }
    }
  },
  blocks: {
    image: {
      isVoid: true
    }
  }
};

/**
 * Get the extension of the URL, using the URL API.
 *
 * @param {String} url
 * @return {String}
 */

function getExtension(url) {
  return new URL(url).pathname.split(".").pop();
}

/**
 * The rich text example.
 *
 * @type {Component}
 */

class ArticleBody extends React.Component {
  constructor(props) {
    super(props);
    this.buttonRef = React.createRef();
  }
  state = {
    value: null,
    title: null,
    editing: false
  };

  /**
   * Deserialize the initial editor value.
   *
   * @type {Object}
   */

  /**
   * Check if the current selection has a mark with `type` in it.
   *
   * @param {String} type
   * @return {Boolean}
   */

  hasMark = type => {
    const { value } = this.state;
    return value.activeMarks.some(mark => mark.type === type);
  };

  /**
   * Check if the any of the currently selected blocks are of `type`.
   *
   * @param {String} type
   * @return {Boolean}
   */

  hasBlock = type => {
    const { value } = this.state;
    return value.blocks.some(node => node.type === type);
  };

  /**
   * Store a reference to the `editor`.
   *
   * @param {Editor} editor
   */

  ref = editor => {
    this.editor = editor;
  };
  hasLinks = () => {
    const { value } = this.state;
    return value.inlines.some(inline => inline.type === "link");
  };
  /**
   * Render.
   *
   * @return {Element}
   */

  renderInline = (props, editor, next) => {
    const { attributes, children, node } = props;
    switch (node.type) {
      case "link": {
        const { data } = node;
        const href = data.get("href");
        return (
          <a
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#d2fafb" }}
            {...attributes}
            href={href}
          >
            {children}
          </a>
        );
      }

      default: {
        return next();
      }
    }
  };
  handleTitleInput = e => {
    this.setState({ title: e.target.value });
  };

  handleEdit = () => {
    this.setState({ editing: !this.state.editing });
  };

  handleSubmit = async () => {
    const { UpdateArticleMutation } = this.props;
    const content = JSON.stringify(this.state.value);
    const title = this.state.title;

    try {
      const suc = await UpdateArticleMutation({
        variables: {
          id: this.props.articleId,
          Title: title,
          Content: content,
          Status: true
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  //after getting data based on the articleId, save content data as state
  componentDidUpdate(prevProps) {
    if (prevProps.ArticleQuery !== this.props.ArticleQuery) {
      if (!this.props.ArticleQuery.error && !this.props.ArticleQuery.loading) {
        this.setState({
          value: Value.fromJSON(
            JSON.parse(this.props.ArticleQuery.Article.Content)
          ),
          title: this.props.ArticleQuery.Article.Title
        });
      }
    } else if (this.state.value === null) {
      if (!this.props.ArticleQuery.error && !this.props.ArticleQuery.loading) {
        this.setState({
          value: Value.fromJSON(
            JSON.parse(this.props.ArticleQuery.Article.Content)
          )
        });
      }
    }
  }

  /**
   * On change, save the new `value`.
   *
   * @param {Editor} editor
   */

  onChange = ({ value }) => {
    const content = JSON.stringify(value.toJSON());
    this.setState({ value });
  };

  render() {
    const { MeQuery, NewArticleMutation, ArticleQuery } = this.props;
    console.log(this.props);
    return (
      <div>
        <div className="blogEditorWrapper">
          {!ArticleQuery.loading && !ArticleQuery.error ? (
            this.state.editing ? (
              <input
                className="titleInput"
                type="text"
                required
                onChange={this.handleTitleInput}
                defaultValue={ArticleQuery.Article.Title}
              />
            ) : (
              <>
                <h1 className="title">{ArticleQuery.Article.Title}</h1>
                <p className="publishDate">
                  {dayjs(parseInt(ArticleQuery.Article.createdAt))
                    .add(
                      dayjs(parseInt(ArticleQuery.Article.createdAt))
                        .toDate()
                        .getTimezoneOffset(),
                      "minute"
                    )
                    .format("MMM DD, YYYY")}
                </p>
              </>
            )
          ) : null}
          {!this.props.MeQuery.loading &&
          !this.props.MeQuery.error &&
          this.props.MeQuery.Me ? (
            <div className="buttonWrapper">
              <button
                className="editButton"
                type="button"
                onClick={this.handleEdit}
                ref={this.buttonRef}
                style={{
                  background: this.state.editing ? "#bb1542" : "#239f95"
                }}
              >
                {this.state.editing ? "editing" : "edit"}
              </button>
              <button
                className="submitButton"
                type="button"
                onClick={this.handleSubmit}
              >
                submit
              </button>
            </div>
          ) : null}
          {!MeQuery.error && !MeQuery.loading && this.state.editing ? (
            <Toolbar>
              {this.renderMarkButton("bold", "format_bold")}
              {this.renderMarkButton("italic", "format_italic")}
              {this.renderMarkButton("underlined", "format_underlined")}
              {this.renderMarkButton("code", "code")}
              {this.renderBlockButton("heading-one", "looks_one")}
              {this.renderBlockButton("heading-two", "looks_two")}
              {this.renderBlockButton("block-quote", "format_quote")}
              {this.renderBlockButton("numbered-list", "format_list_numbered")}
              {this.renderBlockButton("bulleted-list", "format_list_bulleted")}
              <Button onMouseDown={this.onClickImage}>
                <img
                  className="iconClass"
                  style={{
                    position: "relative",
                    bottom: "1px",
                    transform: "scale(0.5)"
                  }}
                  src={"/static/icons/add_a_photo.svg"}
                />
              </Button>
              <Button active={this.hasLinks()} onMouseDown={this.onClickLink}>
                <img
                  className="iconClass"
                  style={{
                    position: "relative",
                    cursor: "pointer",
                    transform: "scale(0.5)"
                  }}
                  src={"/static/icons/insert_link.svg"}
                />
              </Button>
            </Toolbar>
          ) : null}
          {this.state.value ? (
            <Editor
              spellCheck
              autoFocus
              ref={this.ref}
              schema={schema}
              value={this.state.value}
              onChange={this.onChange}
              onKeyDown={this.onKeyDown}
              onDrop={this.onDropOrPaste}
              onPaste={this.onDropOrPaste}
              renderBlock={this.renderBlock}
              renderMark={this.renderMark}
              renderInline={this.renderInline}
              readOnly={this.state.editing ? false : true}
            />
          ) : null}
        </div>

        <style jsx>
          {`
            .titleInput {
              position: relative;
              background: transparent;
              outline: none;
              border: none;
              padding: 0.5rem;
              margin: 0 0.5rem;
              color: #fff;
              font-size: 2rem;
              text-transform: uppercase;
            }
            .blogEditorWrapper {
              display: flex;
              flex-direction: column;
              border-radius: 2px;
              padding: 10px;
              width: 60vw;
              margin: 120px 0 150px 0;
              height: 100%;
              color: #fff;
              position: absolute;
              top: 350px;
              font-family: "Poppins";
              left: 50%;
              transform: translate(-50%, -50%);
              animation: 2.5s fadeIn forwards;
              opacity: 0;
            }

            @keyframes fadeIn {
              0% {
                opacity: 0;
              }
              100% {
                opacity: 1;
              }
            }
            .editButton {
              margin: 5px;
              background: #239f95;
              border: none;
              border-radius: 3px;
              padding: 0.4rem 0.8rem;
              cursor: pointer;
              letter-spacing: 0.1rem;
              outline: none;
              position: relative;
              right: 0;
            }

            .submitButton {
              background: #cecece;
              margin: 5px;
              border: none;
              border-radius: 3px;
              padding: 0.4rem 0.8rem;
              cursor: pointer;
              letter-spacing: 0.1rem;
              outline: none;
              position: relative;
            }

            .submitButton:hover,
            .editButton:hover,
            .iconClass:hover {
              opacity: 0.65;
            }
            .buttonWrapper {
              position: relative;
              width: 100%;
              display: flex;
              flex-wrap: wrap;
              justify-content: flex-end;
            }
            .title {
              margin-bottom: 0.3rem;
              text-transform: uppercase;
              letter-spacing: 0.25rem;
            }
            .publishDate {
              letter-spacing: 0.1rem;
              font-size: 0.75rem;
              margin-bottom: 2rem;
              color: #50b6bb;
            }
            link {
              color: #f6d365;
            }

            @media screen and (max-width: 960px) {
              .blogEditorWrapper {
                width: 80vw;
              }
            }
          `}
        </style>
      </div>
    );
  }

  /**
   * Render a mark-toggling toolbar button.
   *
   * @param {String} type
   * @param {String} icon
   * @return {Element}
   */

  renderMarkButton = (type, icon) => {
    const isActive = this.hasMark(type);

    return (
      <Button
        active={isActive}
        onMouseDown={event => this.onClickMark(event, type)}
        onMouseOver={e => this.handleHover(e)}
        onMouseLeave={e => this.handleLeave(e)}
      >
        <Icon bgi={icon}></Icon>
      </Button>
    );
  };

  handleHover = e => {
    e.target.style.opacity = 0.7;
  };

  handleLeave = e => {
    e.target.style.opacity = 1;
  };

  /**
   * Render a block-toggling toolbar button.
   *
   * @param {String} type
   * @param {String} icon
   * @return {Element}
   */

  renderBlockButton = (type, icon) => {
    let isActive = this.hasBlock(type);

    if (["numbered-list", "bulleted-list"].includes(type)) {
      const {
        value: { document, blocks }
      } = this.state;

      if (blocks.size > 0) {
        const parent = document.getParent(blocks.first().key);
        isActive = this.hasBlock("list-item") && parent && parent.type === type;
      }
    }

    return (
      <Button
        active={isActive}
        onMouseDown={event => this.onClickBlock(event, type)}
        onMouseOver={e => this.handleHover(e)}
        onMouseLeave={e => this.handleLeave(e)}
      >
        <Icon bgi={icon}></Icon>
      </Button>
    );
  };

  onClickImage = event => {
    event.preventDefault();
    const src = window.prompt("Enter the URL of the image:");
    if (!src) return;
    this.editor.command(insertImage, src);
  };

  /**
   * Render a Slate block.
   *
   * @param {Object} props
   * @return {Element}
   */

  renderBlock = (props, editor, next) => {
    const { attributes, children, node, isFocused } = props;

    switch (node.type) {
      case "image":
        const src = node.data.get("src");
        return (
          <img
            {...attributes}
            src={src}
            className={css`
              position: relative;
              left: 50%;
              margin: "5px 0";
              transform: translateX(-50%);
              display: block;
              max-width: 100%;
              max-height: 20em;
              box-shadow: ${isFocused ? "0 0 0 2px blue;" : "none"};
            `}
          />
        );

      case "link":
        const { data } = node;
        const href = data.get("href");
        return (
          <a
            target="_blank"
            rel="noopener noreferrer"
            style={{ cursor: "pointer" }}
            href={href}
          >
            {children}
          </a>
        );
      case "block-quote":
        return (
          <blockquote
            className="quote"
            style={{
              borderLeft: "2px solid #ef4b4b",
              padding: "0 10px",
              margin: "15px",
              top: "15px",
              bottom: "15px",
              lineHeight: "1.8rem",
              fontSize: "1.2rem"
            }}
          >
            <i>{children}</i>
          </blockquote>
        );
      case "bulleted-list":
        return <ul style={{ marginLeft: "15px" }}>{children}</ul>;
      case "heading-one":
        return <h1 {...attributes}>{children}</h1>;
      case "heading-two":
        return <h2 {...attributes}>{children}</h2>;
      case "list-item":
        return <li style={{ marginLeft: "15px" }}>{children}</li>;
      case "numbered-list":
        return <ol style={{ marginLeft: "15px" }}>{children}</ol>;
      default:
        return next();
    }
  };

  /**
   * Render a Slate mark.
   *
   * @param {Object} props
   * @return {Element}
   */

  renderMark = (props, editor, next) => {
    const { children, mark, attributes } = props;

    switch (mark.type) {
      case "bold":
        return <strong {...attributes}>{children}</strong>;
      case "code":
        return <code {...attributes}>{children}</code>;
      case "italic":
        return <em {...attributes}>{children}</em>;
      case "underlined":
        return <u {...attributes}>{children}</u>;
      default:
        return next();
    }
  };

  /**
   * When clicking a link, if the selection has a link in it, remove the link.
   * Otherwise, add a new link with an href and text.
   *
   * @param {Event} event
   */

  onClickLink = event => {
    event.preventDefault();

    const { editor } = this;
    const { value } = editor;
    const hasLinks = this.hasLinks();

    if (hasLinks) {
      editor.command(unwrapLink);
    } else if (value.selection.isExpanded) {
      const href = window.prompt("Enter the URL of the link:");

      if (href == null) {
        return;
      }

      editor.command(wrapLink, href);
    } else {
      const href = window.prompt("Enter the URL of the link:");

      if (href == null) {
        return;
      }

      const text = window.prompt("Enter the text for the link:");

      if (text == null) {
        return;
      }

      editor
        .insertText(text)
        .moveFocusBackward(text.length)
        .command(wrapLink, href);
    }
  };

  /**
   * On key down, if it's a formatting command toggle a mark.
   *
   * @param {Event} event
   * @param {Editor} editor
   * @return {Change}
   */

  onClickImage = event => {
    event.preventDefault();
    const src = window.prompt("Enter the URL of the image:");
    if (!src) return;
    this.editor.command(insertImage, src);
  };

  onKeyDown = (event, editor, next) => {
    let mark;

    if (isBoldHotkey(event)) {
      mark = "bold";
    } else if (isItalicHotkey(event)) {
      mark = "italic";
    } else if (isUnderlinedHotkey(event)) {
      mark = "underlined";
    } else if (isCodeHotkey(event)) {
      mark = "code";
    } else {
      return next();
    }

    event.preventDefault();
    editor.toggleMark(mark);
  };

  onDropOrPaste = (event, editor, next) => {
    if (editor.value.selection.isCollapsed) return next();
    const target = editor.findEventRange(event);
    if (!target && event.type === "drop") return next();

    const transfer = getEventTransfer(event);
    const { type, text, files } = transfer;

    if (type === "files") {
      for (const file of files) {
        const reader = new FileReader();
        const [mime] = file.type.split("/");
        if (mime !== "image") continue;

        reader.addEventListener("load", () => {
          editor.command(insertImage, reader.result, target);
        });

        reader.readAsDataURL(file);
      }
      return;
    }

    if (type === "text") {
      if (!isUrl(text)) return next();
      if (!isImage(text)) return next();
      editor.command(insertImage, text, target);
      return;
    }
    if (type !== "text" && type !== "html") return next();
    if (!isUrl(text)) return next();

    if (this.hasLinks()) {
      editor.command(unwrapLink);
    }

    editor.command(wrapLink, text);

    next();
  };

  /**
   * When a mark button is clicked, toggle the current mark.
   *
   * @param {Event} event
   * @param {String} type
   */

  onClickMark = (event, type) => {
    event.preventDefault();
    this.editor.toggleMark(type);
  };

  /**
   * When a block button is clicked, toggle the block type.
   *
   * @param {Event} event
   * @param {String} type
   */

  onClickBlock = (event, type) => {
    event.preventDefault();

    const { editor } = this;
    const { value } = editor;
    const { document } = value;

    // Handle everything but list buttons.
    if (type !== "bulleted-list" && type !== "numbered-list") {
      const isActive = this.hasBlock(type);
      const isList = this.hasBlock("list-item");

      if (isList) {
        editor
          .setBlocks(isActive ? DEFAULT_NODE : type)
          .unwrapBlock("bulleted-list")
          .unwrapBlock("numbered-list");
      } else {
        editor.setBlocks(isActive ? DEFAULT_NODE : type);
      }
    } else {
      // Handle the extra wrapping required for list buttons.
      const isList = this.hasBlock("list-item");
      const isType = value.blocks.some(block => {
        return !!document.getClosest(block.key, parent => parent.type === type);
      });

      if (isList && isType) {
        editor
          .setBlocks(DEFAULT_NODE)
          .unwrapBlock("bulleted-list")
          .unwrapBlock("numbered-list");
      } else if (isList) {
        editor
          .unwrapBlock(
            type === "bulleted-list" ? "numbered-list" : "bulleted-list"
          )
          .wrapBlock(type);
      } else {
        editor.setBlocks("list-item").wrapBlock(type);
      }
    }
  };
}

/**
 * Export.
 */

export default compose(
  graphql(UpdateArticleMutation, {
    name: "UpdateArticleMutation"
  }),
  graphql(ArticleQuery, {
    name: "ArticleQuery",
    options: props => {
      return {
        variables: {
          id: props.articleId
        }
      };
    }
  }),
  graphql(MeQuery, { name: "MeQuery" })
)(ArticleBody);
