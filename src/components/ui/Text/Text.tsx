export const Heading = (props: { content: string }) => {
	return <p className='text-heading font-light my-[2.4rem] text-pureWhite cursor-default'>{props.content}</p>
}

export const Text = (props: { content: string }) => {
	return <p className='text-text font-light my-[2.4rem] text-greyishBlue cursor-default'>{props.content}</p>
}
