import React from 'react';
import styled from 'styled-components';
import { FaGlobe, FaUsers, FaHandshake, FaLightbulb } from 'react-icons/fa';

const AboutContainer = styled.div`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
`;

const Description = styled.p`
  text-align: center;
  color: #666;
  line-height: 1.8;
  max-width: 800px;
  margin: 0 auto 3rem;
  font-size: 1.1rem;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const StatBox = styled.div`
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const StatIcon = styled.div`
  font-size: 2.5rem;
  color: #4ecdc4;
  margin-bottom: 1rem;
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #666;
`;

const StorySection = styled.div`
  background: white;
  padding: 3rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 3rem;
`;

const StoryTitle = styled.h2`
  color: #2c3e50;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const StoryText = styled.p`
  color: #666;
  line-height: 1.8;
  margin-bottom: 1rem;
`;

const About = () => {
  const stats = [
    {
      icon: <FaGlobe />,
      number: "50+",
      label: "Countries Served"
    },
    {
      icon: <FaUsers />,
      number: "10,000+",
      label: "Happy Clients"
    },
    {
      icon: <FaHandshake />,
      number: "500+",
      label: "Partnerships"
    },
    {
      icon: <FaLightbulb />,
      number: "15+",
      label: "Years of Innovation"
    }
  ];

  return (
    <AboutContainer>
      <Title>About Our Company</Title>
      <Description>
        Welcome to our company, a leader in providing cutting-edge solutions 
        to businesses worldwide. Our mission is to empower companies with 
        innovative technology and personalized support to achieve their goals.
      </Description>

      <StatsContainer>
        {stats.map((stat, index) => (
          <StatBox key={index}>
            <StatIcon>{stat.icon}</StatIcon>
            <StatNumber>{stat.number}</StatNumber>
            <StatLabel>{stat.label}</StatLabel>
          </StatBox>
        ))}
      </StatsContainer>

     
    </AboutContainer>
  );
};

export default About;
