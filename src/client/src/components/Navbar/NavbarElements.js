import styled from 'styled-components';
import { NavLink as LinkR } from 'react-router-dom';

export const Nav = styled.nav`
	background: #fdfdfd;
	height: 80px;
	/* margin-top: -80px; */
	display: flex;
	justify-content: left;
	align-items: center;
	font-size: 1rem;
	position: sticky;
	top: 0;
	z-index: 10;
	@media screen and (max-width: 960 px) {
		transition: 0.8s all ease;
		position: relative;
	}
`;

export const NavbarContainer = styled.div`
	display: flex;
	justify-content: space-between;
	height: 80 px;
	z-index: 1;
	width: 100%;
	padding: 0 1px;
	max-width: 1100px;
`;

export const NavLinks = styled(LinkR)`
    color: #021C35;
    display: flex;
    align-items: center;
	text-decoration: none;
	margin-top: 0.55rem;
    padding: 0 3rem;
    height: 100%;
	cursor: pointer;
	font-size: 1.2rem;
    &.active{
		border-bottom: 0.1rem solid #021c35;
		font-weight: bold;
		
    }
	&:hover{
		color: #272343;
		font-weight: bolder;
		
	}
`;

export const MobileIcon = styled.div`
	display: none;
	@media screen and (max-width: 768px) {
		display: block;
		position: absolute;
		top: 0;
		right: 0;
		transform: translate(-100%, 40%);
		font-size: 1.8rem;
		cursor: pointer;
		color: #ffffff;
	}
`;

export const NavMenu = styled.ul`
	display: flex;
	align-items: center;
	list-style: none;
	text-align: center;
	margin-right: -22px;
	@media screen and (max-width: 768px) {
		display: none;
	}
`;

export const NavItem = styled.li`height: 80px;`;

export const NavBtn = styled.nav`
	display: flex;
	align-items: center;
	@media screen and (max-width: 768px) {
		display: none;
	}
`;

export const NavBtnLink = styled(LinkR)`
	border-radius: 50px;
	background: #01bf71;
	white-space: nowrap;
	padding: 10px 22px;
	color: #010606;
	font-size: 16px;
	outline: none;
	border: none;
	cursor: pointer;
	transition: all 0.2 easein-out;
	text-decoration: none;
	&:hover{
		transition: all 0.2s ease-in-out;
		background:#fff;
		color: #010606;
	}
`;