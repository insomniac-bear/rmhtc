const GROUP = ['root', 'administrator', 'owner', 'moderator'];
const OBJECTS = ['users', 'companies', 'persons', 'news', 'demands', 'offers', 'comments', 'regions', 'countries', 'companyTypes', 'registrationNymberTypes'];
const ACTIONS = ['create', 'read', 'update', 'delete', 'aprove'];
const LIMIT_TYPES = [...OBJECTS, 'all', 'none'];
const LIMIT_VALUIES = [];

const createOwnerScope = () => {
  const scope = {};
  scope.name = GROUP[2];
  OBJECTS.forEach(item => {
    
  })
};