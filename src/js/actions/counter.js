export const COUNTER_INCREMENT = 'COUNTER_INCREMENT';
export function increment() {
	return {
		type : COUNTER_INCREMENT
	};
}

export default {
  increment
};
