https://www.youtube.com/watch?v=dDeWWQWMM-Y&t=126s  
This RESTful application include: 
- Working with Postgres Database. Sequelize ORM
- User and roles administrating  
- Registration and authentication. Using JWT tokens. Bcrypt hash for passwords
- Role guards
- Validation pipe
- Post creating, working with files
- Seeding roles
# Development
Set POSTGRES_HOST in .development.env
```bash
# Run postgres + pgadmin
docker-compose -f docker-compose-postgres.yml -p postgres-test up -d
# Run server
npm run start:dev
# Database seeding. Seed USER & ADMIN roles.
npm run seed:all:dev
# If you need undo seed
npm run seed:undo:all:dev
```
### Access to pgAdmin
1. Visit: http://localhost:5050/browser/ 
2. Login: admin@admin.com  
   Password: root
3. Register server on Docker IP  
   Username: root  
   Password: root  

# Deployment

```bash
# Run postgres + server
docker-compose -p rest-app up -d
```
# Documentation 
Swagger  
Guard for swagger? 

# Usage
1. 
2.  

# Tests?



