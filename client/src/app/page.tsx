import Image from "next/image";

export default function Home() {
	return (
		<div>
			<h1>Welcome to the Home Page</h1>
			<p>This is the home page of our application.</p>
			<p>
				Here you can find various resources and links to other sections of the
				app.
			</p>
			<p>Feel free to explore!</p>
			<Image
				src="/images/hero.png"
				alt="Hero Image"
				width={500}
				height={300}
				className="rounded-lg"
			/>
		</div>
	);
}
