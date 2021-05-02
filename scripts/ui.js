class ChatUI {
    constructor(list) {
        this.list = list;
    }

    clear() {
        this.list.innerHTML = '';
    }

    render(data) {
        const when = dateFns.distanceInWordsToNow(
            data.create_at.toDate(),
            {addSuffix: true}
        )

        const html = `
        <li class="list-group-item">
        <span class="username">${data.username}</span>
        <span class="message">${data.message}</span>
        <span class="time">${when}</span>
        </li>
        `;
        this.list.innerHTML += html;
    }
}