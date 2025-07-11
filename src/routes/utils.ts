export function shuffle<T>(array: T[]){
	let i=array.length;
	while(i--){
		const j=Math.floor(Math.random()*(i+1));
		const temp=array[i];
		array[i]=array[j];
		array[j]=temp;
	}
	return array;
  }

export function get_twemoji_url(emoji: string){
	const code =[...emoji].map(c=>c.codePointAt(0)!.toString(16)).join('-');
	return `/svg/${code}.svg`;
}
export function get_custom_svg_url(filename: string) {
	return `/svg/${filename}`;
}
