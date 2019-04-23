const config = {
    port : process.env.PORT || 3000,
    db : 'mongodb://localhost/quadmind',
    test_env : 'test',
    test_db : 'mongodb://localhost/quadmind-demo',
    test_port : 3001
}

export default  config