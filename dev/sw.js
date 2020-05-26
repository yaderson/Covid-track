self.addEventListener('push', (e) => {
    const notify = e.data.json()
    const title = notify.title
    console.log(notify)
    const options = {
        body: notify.body,
        icon: './img/icons/android-chrome-192x192.png'
    }
    e.waitUntil(self.registration.showNotification(title,options))
})