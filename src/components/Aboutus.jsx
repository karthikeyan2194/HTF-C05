import React from 'react';
import styled from 'styled-components';
import { FaGlobe, FaUsers, FaHandshake, FaLightbulb } from 'react-icons/fa';
import ProfilePic1 from '../assets/images/member1.jpg'; 
import ProfilePic2 from '../assets/images/member2.jpg';
import ProfilePic3 from '../assets/images/member3.jpg';
import ProfilePic4 from '../assets/images/member4.jpg';

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

const TeamContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
	gap: 2rem;
	margin-top: 3rem;
`;

const TeamMember = styled.div`
	background: #f9f9f9;
	border-radius: 15px;
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
	padding: 2rem;
	text-align: center;
`;

const ProfileImage = styled.img`
	border-radius: 50%;
	width: 150px;
	height: 150px;
	margin-bottom: 1.5rem;
	border: 4px solid #4ecdc4;
`;

const MemberName = styled.h3`
	color: #2c3e50;
	margin-bottom: 1rem;
`;

const MemberDescription = styled.p`
	color: #777;
	line-height: 1.6;
`;

const About = () => {
	const stats = [
		{
			icon: <FaGlobe />,
			number: '50+',
			label: 'Countries Served'
		},
		{
			icon: <FaUsers />,
			number: '10,000+',
			label: 'Happy Clients'
		},
		{
			icon: <FaHandshake />,
			number: '500+',
			label: 'Partnerships'
		},
		{
			icon: <FaLightbulb />,
			number: '15+',
			label: 'Years of Innovation'
		}
	];

	const teamMembers = [
		{
			image: ProfilePic1,
			name: 'Dinesh Kumar M',
			description: 'A passionate innovator and technology enthusiast focused on developing solutions that make a real-world impact.'
		},
		{
			image: ProfilePic2,
			name: 'Karthikeyan R',
			description: 'Creating intuitive and beautiful designs that enhance user experience across all platforms   '
		},
		{
			image: ProfilePic3,
			name: 'Mohamed Shakeel Athar J',
			description: 'Passionate about cybersecurity,working on innovative solutions to solve real-world challenges.'
		},
		{
			image: ProfilePic4,
			name: 'Madesh B',
			description: 'Experienced in web development and machine learning, focusing on scalable and efficient solutions.'
		}
	];

	return (
		<AboutContainer>
			<Title>About Our Company</Title>
			<Description>
				Welcome to MapIndust! We deliver advanced geospatial solutions, empowering industries with AI-driven insights 
				and strategic location intelligence to optimize operations and drive sustainable growth. Join us in shaping 
				a smarter, more connected future with MapIndust.
			</Description>

			

			
			<Title>Meet Our Team</Title>
			<TeamContainer>
				{teamMembers.map((member, index) => (
					<TeamMember key={index}>
						<ProfileImage src={member.image} alt={member.name} />
						<MemberName>{member.name}</MemberName>
						<MemberDescription>{member.description}</MemberDescription>
					</TeamMember>
				))}
			</TeamContainer>
		</AboutContainer>
	);
};

export default About;
