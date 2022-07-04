class UserDto {
  constructor (data = null) {
    /** @type { UUIDv4 } */
    this._id = data?.uuid;

    /** @type { String } */
    this.email = data?.email;

    /** @type { Boolean } */
    this.emailVerified = data?.emailVerified;

    /** @type { String } */
    this.businessRole = data?.businessRole;

    /** @type { String } */
    this.name = data?.name;

    /** @type { String } */
    this.surname = data?.surname;

    /** @type { String } */
    this.avatarUrl = data?.avatarUrl;
  }
};

module.exports = UserDto;