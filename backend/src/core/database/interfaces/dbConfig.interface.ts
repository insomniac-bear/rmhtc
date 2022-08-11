export interface IDatabaseConfigAttributes {
  username?: string;
  password?: string;
  database?: string;
  host?: string;
  port?: number;
  dialect?: string;
  urlDatabase?: string;
  logging?: boolean;
}

export interface IDatabaseConfig {
  development: IDatabaseConfigAttributes;
  local: IDatabaseConfigAttributes;
  production: IDatabaseConfigAttributes;
}
