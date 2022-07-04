class RolesDto {
  constructor (data = null) {
    /** @type { String } */
    this.name = data?.name;

    /** @type { Array } */
    this.category = data?.category;
  }
};

module.exports = RolesDto;