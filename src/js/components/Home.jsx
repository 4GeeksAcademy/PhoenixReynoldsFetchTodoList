import React, { useState } from "react";


//include images into your bundle
import todolight from "../../img/todolight.png";
import tododark from "../../img/tododark.png";

//create your first component

const Home = () => {
	const [isDarkTheme, setIsDarkTheme] = useState(false);

	return (

		<div
			className={`d-flex flex-column ${isDarkTheme ? "text-light" : "text-secondary"}`}
			style={{
				minHeight: "100vh",
				backgroundImage: `url(${isDarkTheme ? tododark : todolight})`,
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
				backgroundPosition: "center"
			}}
		>
			<div className="flex-grow-1"> {/* Content */}
				<div className="container">
					<div className="row align-items-center" style={{ minHeight: "100vh" }}>
						<div className="col-6 d-flex justify-content-center">
							<div>input goes here</div>
						</div>
						<div className="col-6">
							<div className="bg-dark">list goes here</div>
							<div>list goes here</div>
							<div>list goes here</div>
							<div>list goes here</div>
							<div>list goes here</div>
							<div>list goes here</div>
							<div>list goes here</div>
							<div>list goes here</div>
						</div>
					</div>
				</div>
			</div>

			<footer
				className="d-flex justify-content-center align-items-center py-3 border-0"
				style={{
					backdropFilter: "blur(10px)",
					height: "12px" // increase height so it's visible
				}}
			>
				<span>
					© 2025 Phoenix Reynolds
				</span>
			</footer>
		</div>
	);
};


export default Home;