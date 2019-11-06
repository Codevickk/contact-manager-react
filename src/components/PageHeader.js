import React from 'react';
import './PageHeader.css';
const PageHeader = (props) => {
	const headerText = props.headerText ? props.headerText : 'Codevickk';
	return (
		<div className="header-container">
			<h2 className="text-center header-text">{headerText}</h2>
		</div>
	);
};

export default PageHeader;
