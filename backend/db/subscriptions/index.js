const subscriptions = {
  db: [],
  handlers: [],
  listen(handler) {
    this.handlers.push(handler);
  },
  contains(subscription) {
    return this.db.some(item => item.phone === subscription.phone);
  },
  add(subscription) {
    this.db.push(subscription);

    this.handlers.forEach(handler => {
      handler(this.db, subscription);
    });
  },
  remove(subscription) {
    const index = this.db.findIndex(item => item.phone === subscription.phone);

    this.db.splice(index, 1);

    this.handlers.forEach(handler => {
      handler(this.db, {});
    });
  }
};

module.exports = subscriptions;
