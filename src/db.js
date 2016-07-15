import monk from 'monk';
export default monk(process.env.MONGO_URL || 'localhost/dogs');
