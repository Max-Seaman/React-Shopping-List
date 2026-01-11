import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

export default function Range(props) {
	const {
		min = 0,
		max = 1000,
		step = 1,
		value = [0, 1000],
		onChange,
		trackColor = '#3b82f6',
		handleColor = '#1d4ed8',
		railColor = '#e5e7eb',
	} = props;
	const [low, high] = value;

	return (
		<div className="w-full">
			<div className="flex gap-1 my-2 w-3/4 sm:w-full mx-auto">
				<div className="bg-blue-300 px-3 py-1 rounded shadow text-sm w-1/2 text-center">${low}</div>
				<div className="bg-blue-300 px-3 py-1 rounded shadow text-sm w-1/2 text-center">${high}</div>
			</div>

			<div className="w-3/4 sm:w-full mx-auto my-4">
				<Slider
					range
					min={min}
					max={max}
					step={step}
					value={value}
					onChange={onChange}
					railStyle={{ backgroundColor: railColor }}
					trackStyle={[{ backgroundColor: trackColor }]}
					handleStyle={[{ borderColor: handleColor, backgroundColor: handleColor }, { borderColor: handleColor, backgroundColor: handleColor }]}
				/>
			</div>
		</div>
	);
}
