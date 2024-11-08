export function capitalizeWord(input: string | undefined): string {
	if (!input) return '';
  return input.charAt(0).toUpperCase() + input.slice(1);
}