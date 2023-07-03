interface SubtitleTypographyProps {
	className?: string;
	children: React.ReactNode;
}

function Subtitle({ className, children }: SubtitleTypographyProps) {
	return <div className={`text-xl font-semibold ${className}`}>{children}</div>;
}

export default Subtitle;
