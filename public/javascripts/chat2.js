'use strict';

class ESFAChat {
  constructor() {
    this.jsChat = document.querySelector('.js-chat');
    this.jsLines = document.querySelector('.js-lines');
    this.jsNickname = document.querySelector('.js-nicknames');
    this.jsSetNickname = document.querySelector('.js-set-nickname');
    this.jsNicknameInput = document.querySelector('.js-nickname-input');
    this.jsNicknameErr = document.querySelector('.js-nickname-err');
    this.jsSendMessage = document.querySelector('.js-send-message');
    this.jsMessage = document.querySelector('.js-message');

    this.connect = this.connect.bind(this);
    this.announcement = this.announcement.bind(this);
    // this.nicknames = this.nicknames.bind(this);
    // this.user = this.user.bind(this);
    // this.reconnect = this.reconnect.bind(this);
    // this.reconnecting = this.reconnecting.bind(this);
    // this.error = this.error.bind(this);

    this.socket = io.connect();
    // console.log(this.socket, this.socket.io.uri);

    this.socket.on('connect', this.connect);
    this.socket.on('announcement', this.announcement(msg));
    this.socket.on('nicknames', this.nicknames(nicknames));
    this.socket.on('user message', this.message);
    this.socket.on('reconnect', this.reconnect());
    this.socket.on('reconnecting', this.reconnecting());
    this.socket.on('error', this.error(e));
  }

  connect() {
    console.log(this.socket);
    this.jsChat.classList.add('connected');
  }

  announcement(msg) {
    // console.log(msg);
    // const announcementBox = this.jsLines
    //   .appendChild(this.jsLines.createElement('p'))
    //   .appendChild(his.jsLines.createElement('em'));
    // announcementBox.innerHTML = msg;
  }
}

new ESFAChat();
