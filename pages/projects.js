import React, { useState, useEffect } from "react";
import _ from "lodash";
import Navbar from "../components/Navbar";
import MyName from "../components/MyName";
import Layout from "../components/Layout";
import ProjectItem from "../components/ProjectItem";
import BarArea from "../components/BarArea";
import Bar from "../components/Bar";
import { ProjectsQuery } from "../graphql/Project";
import { graphql } from "react-apollo";

function projects(props) {
  const [currentProject, setCurrentProject] = useState(null);
  const [length, setLength] = useState(0);
  const [num, setNum] = useState(null);

  useEffect(() => {
    if (props.data && !props.data.loading) {
      const len = props.data.Projects.length;
      setLength(len);
      setNum(len - 1);
      setCurrentProject(props.data.Projects[len - 1]);
    }
  }, [props]);

  if (!props.data || props.data.loading) {
    return (
      <Layout>
        <h4>{""}</h4>
      </Layout>
    );
  } else {
    const { Projects } = props.data;

    const renderBar = () => {
      return Projects.map((p, index) => {
        return (
          <Bar
            key={p.id}
            self={p}
            num={index}
            setNum={setNum}
            currentProject={currentProject}
            setCurrentProject={setCurrentProject}
          />
        );
      });
    };
    return (
      <Layout>
        <BarArea>{renderBar()}</BarArea>
        {currentProject && (
          <ProjectItem Index={num} currentProject={currentProject} />
        )}
      </Layout>
    );
  }
}

export default graphql(ProjectsQuery)(projects);
