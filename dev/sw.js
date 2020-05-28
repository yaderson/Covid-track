self.addEventListener('push', (e) => {
    const notify = e.data.json()
    const title = notify.title
    console.log(notify)
    const options = {
        body: notify.body,
        icon: './img/icons/android-chrome-192x192.png'
    }
    const not  = e.waitUntil(self.registration.showNotification(title,options))
    not.onclick = function(event) {
        event.preventDefault(); // Previene al buscador de mover el foco a la pestaña del Notification
        window.open(`https://covid-track-yader.web.app/Current-report?country=${notify.slug}`, '_blank');
    }
})