abstract class Config{

}

class Development extends Config{
    public urls={
        "admin": "http://localhost:8080/api/admin",
        "companies":"http://localhost:8080/api/companies",
        "customers":"http://localhost:8080/api/customers"
    }
}
class Production extends Config{
    public urls={
        "admin": "http://localhost:8080/api/admin",
        "companies":"http://localhost:8080/api/companies",
        "customers":"http://localhost:8080/api/users/customers"
    
    }
}

const globals = process.env.NODE_ENV === 'production' ? new Production : new Development;

export default globals;