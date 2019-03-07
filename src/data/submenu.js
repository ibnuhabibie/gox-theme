module.exports = {
	Dashboard: [
		{
			name: 'UI Elements',
			child: [
				{ name: 'Cards', path: '/pages/cards.html' },
				{ name: 'Table', path: '/pages/table.html' },
				{ name: 'Modal', path: '/pages/modal.html' },
				{ name: 'Notification', path: '/pages/notification.html' },
				{ name: 'Widget', path: '/pages/widget.html' },
				{ name: 'Forms', path: '/pages/forms.html' }
			]
		},
		{
			name: 'Pages',
			child: [
				{ name: 'Dashboard', path: '/' },
				{ name: 'Login', path: '/pages/login.html' },
				{ name: 'Blank', path: '/pages/blank.html' },
				{ name: 'Error', path: '/pages/error.html' }
			]
		}
	]
}