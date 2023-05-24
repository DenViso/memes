import axios from "axios";
import { useState, useEffect } from "react";

function App() {
	// state

	const [text, setText] = useState({ textTop: "", textBottom: "" });
	function onChangeText(event) {
		setText((prevText) => {
			return {
				...prevText,
				[event.target.name]: event.target.value,
			};
		});
	}

	// effect
	const [memes, setMemes] = useState([]);
	const [singlMemes, setSinglMemes] = useState("https://i.imgflip.com/22bdq6.jpg");

	useEffect(() => {
		axios
			.get("https://api.imgflip.com/get_memes")
			.then((res) => setMemes(res.data.data.memes));
	}, []);

	// onClick

	const onClickButton = () => {
		if (!memes) {
			return;
		}
		const rundom = Math.floor(Math.random() * memes.length);
		setSinglMemes(memes[rundom].url);
	};
	
// console.log(memes);
	return (
		<div className="App">
			<div className="head">
				<div className="logo">
					<img
						className="logo__img"
						src="./image/Troll Face.svg"
						alt="logoPicture"
					/>
					<p className="logo__text">Meme Generator</p>
				</div>
				<p className="logo__name">by Denis</p>
			</div>
			<div className="conteiner">
				<form className="form">
					<label htmlFor="textTop">
						<input
							className="form__text"
							name="textTop"
							id="textTop"
							type="text"
							placeholder="Enter top text"
							onChange={(e) => onChangeText(e)}
						/>
					</label>

					<label htmlFor="textBottom">
						<input
							className="form__text"
							name="textBottom"
							id="textBottom"
							type="text"
							placeholder="Enter bottom text"
							onChange={(e) => onChangeText(e)}
						/>
					</label>

					<button type="button" className="form__button" onClick={onClickButton}>
						Get a new meme image 🖼
					</button>
				</form>
				<h2 className="form__title1">{text.textTop}</h2>
				<h2 className="form__title2">{text.textBottom}</h2>
				<img className="meme" src={singlMemes} alt="Memse" />
			</div>
		</div>
	);
}

export default App;
