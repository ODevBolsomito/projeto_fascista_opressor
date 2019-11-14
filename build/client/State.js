var State = exports.State = {
	user: JSON.parse(window.sessionStorage.getItem('user')),
	competicao: JSON.parse(window.sessionStorage.getItem('competicao')),
	errors: [],
	success: []
};
