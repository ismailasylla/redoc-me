import { H1, MiddlePanel } from '../../common-elements';
import styled, { extensionsHook } from '../../styled-components';

const delimiterWidth = 15;

export const ApiInfoWrap = MiddlePanel;

export const ApiHeader = styled(H1)`
  margin-top: 0;
  margin-bottom: 0.5em;

  ${extensionsHook('ApiHeader')};
`;

export const BackButton = styled.a`
	border: 1px solid ${(props) => props.theme.colors.primary.main};
	color: ${(props) => props.theme.colors.primary.main};
	font-weight: normal;
	margin-left: 0.5em;
	margin-bottom: 1.5em;
	padding: 4px 8px 4px;
	padding-bottom: 10px;
	display: inline-block;
	text-decoration: none;
	cursor: pointer;

	${extensionsHook('BackButton')};
`;

export const NextButton = styled.a`
	border: 1px solid ${(props) => props.theme.colors.primary.main};
	color: ${(props) => props.theme.colors.primary.main};
	font-weight: normal;
	margin-left: 0.5em;
	margin-bottom: 1.5em;
	margin-top: 1.5em;
	padding: 4px 8px 4px 10px;

	display: inline-block;
	text-decoration: none;
	cursor: pointer;
	display: inline-block;
	color: rgb(50, 50, 159);
	border-width: 1px;
	border-style: solid;
	border-color: rgb(50, 50, 159);
	border-image: initial;
	padding: 5px 10px;
	border-radius: 5px;
	margin-left: 270px;
	@media (max-width: 750px) and (min-width: 400px) {
		position: 'center';
		margin-left: 200px;
	}

	${extensionsHook('NextButton')};
`;
export const ShowInfo = styled.a`
	border: 1px solid ${(props) => props.theme.colors.primary.main};
	color: ${(props) => props.theme.colors.primary.main};
	font-weight: normal;
	margin-left: 0.5em;
	margin-bottom: 1.5em;
	padding: 4px 8px 4px;
	padding-bottom: 10px;
	display: inline-block;
	text-decoration: none;
	cursor: pointer;

	${extensionsHook('NextButton')};
`;

export const DownloadButton = styled.a`
	border: 1px solid ${(props) => props.theme.colors.primary.main};
	color: ${(props) => props.theme.colors.primary.main};
	font-weight: normal;
	margin-left: 0.5em;
	padding: 4px 8px 4px;
	display: inline-block;
	text-decoration: none;
	cursor: pointer;

	${extensionsHook('DownloadButton')};
`;

export const InfoSpan = styled.span`
	&::before {
		content: '|';
		display: inline-block;
		opacity: 0.5;
		width: ${delimiterWidth}px;
		text-align: center;
	}

	&:last-child::after {
		display: none;
	}
`;

export const InfoSpanBoxWrap = styled.div`overflow: hidden;`;

export const InfoSpanBox = styled.div`
	display: flex;
	flex-wrap: wrap;
	// hide separator on new lines: idea from https://stackoverflow.com/a/31732902/1749888
	margin-left: -${delimiterWidth}px;
`;
