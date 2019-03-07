const submenu = require('./submenu')
const table = require('./table')

module.exports = {
	menu: [
		{ name: 'Dashboard', icon: 'home', path: '/' },
		{ name: 'Components', icon: 'box', path: '/' },
		{ name: 'User', icon: 'users', path: '/' },
		{ name: 'System', icon: 'settings', path: '/' },
		{ name: 'Extension', icon: 'package', path: '/'  }
	],
	submenu,
	table: table
}