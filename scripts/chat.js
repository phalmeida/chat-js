// adding new chat documents
// setting up a real-time listener to get new charts
// updating the username
// updating the room
class Chatroom {
    constructor(room, username) {
        this.room = room;
        this.username = username;
        this.charts = db.collection('chats');
        this.unsub;
    }

    async addChat(message) {
        //format a chat object
        const now = new Date();
        const chat = {
            message,
            username: this.username,
            room: this.room,
            create_at: firebase.firestore.Timestamp.fromDate(now)
        }

        //save the chat document
        const response = await this.charts.add(chat);
        return response;
    }

    getChats(callback) {
        this.unsub = this.charts
            .where('room', '==', this.room)
            .orderBy('create_at')
            .onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if (change.type === 'added') {
                        //update the ui
                        callback(change.doc.data());
                    }
                })
            })
    }

    updateName(username) {
        this.username = username;
        localStorage.setItem('username', username);
    }

    updateRoom(room) {
        this.room = room;
        console.log('room updated');
        if (this.unsub) {
            this.unsub();
        }
    }

}