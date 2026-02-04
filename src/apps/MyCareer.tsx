import styled from 'styled-components';
import { GroupBox, Anchor } from 'react95';

const Container = styled.div`
  padding: 16px;
  overflow: auto;
  height: 100%;
`;

const Section = styled(GroupBox)`
  margin-bottom: 16px;
`;

const JobTitle = styled.h3`
  margin: 0 0 4px 0;
  font-weight: bold;
`;

const Company = styled.p`
  margin: 0 0 4px 0;
  font-style: italic;
`;

const Period = styled.p`
  margin: 0 0 8px 0;
  color: #666;
  font-size: 12px;
`;

const Description = styled.p`
  margin: 0;
  line-height: 1.4;
`;

const Skills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 8px;
`;

const Skill = styled.span`
  background: #c0c0c0;
  padding: 2px 8px;
  border: 1px solid #808080;
  font-size: 12px;
`;

export default function MyCareer() {
  return (
    <Container>
      <Section label="About Me">
        <Description>
          Welcome to my personal site! I'm a software developer passionate about
          building great user experiences. Feel free to explore my career history
          and projects.
        </Description>
      </Section>

      <Section label="Current Position">
        <JobTitle>Senior Software Engineer</JobTitle>
        <Company>Tech Company Inc.</Company>
        <Period>2022 - Present</Period>
        <Description>
          Leading development of web applications using modern technologies.
          Working with cross-functional teams to deliver high-quality software
          solutions.
        </Description>
        <Skills>
          <Skill>React</Skill>
          <Skill>TypeScript</Skill>
          <Skill>Node.js</Skill>
          <Skill>AWS</Skill>
        </Skills>
      </Section>

      <Section label="Previous Experience">
        <JobTitle>Software Developer</JobTitle>
        <Company>Startup Co.</Company>
        <Period>2019 - 2022</Period>
        <Description>
          Developed and maintained full-stack applications. Collaborated with
          designers and product managers to implement new features.
        </Description>
        <Skills>
          <Skill>JavaScript</Skill>
          <Skill>Python</Skill>
          <Skill>PostgreSQL</Skill>
        </Skills>
      </Section>

      <Section label="Education">
        <JobTitle>B.S. Computer Science</JobTitle>
        <Company>University of Technology</Company>
        <Period>2015 - 2019</Period>
        <Description>
          Graduated with honors. Focused on software engineering and
          distributed systems.
        </Description>
      </Section>

      <Section label="Contact">
        <Description>
          <Anchor href="mailto:hello@example.com">hello@example.com</Anchor>
          <br />
          <Anchor href="https://github.com" target="_blank">GitHub</Anchor>
          {' | '}
          <Anchor href="https://linkedin.com" target="_blank">LinkedIn</Anchor>
        </Description>
      </Section>
    </Container>
  );
}
