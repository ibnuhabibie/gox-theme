module.exports = {
	Dashboard: [
		{
			name: 'UI Elements',
			child: [
				{ name: 'Cards', path: '/pages/cards.html' },
				{ name: 'Basic Table', path: '/pages/basic-table.html' },
				{ name: 'Datatable', path: '/pages/datatable.html' },
				{ name: 'Forms', path: '/pages/forms.html' }
			]
		},
		{
			name: 'Pages',
			child: [
				{ name: 'Dashboard', path: '/' },
				{ name: 'Blank', path: '/pages/blank.html' },
				{ name: 'Error', path: '/pages/error.html' }
			]
		}
	]
}