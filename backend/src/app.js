import app from './server';

//  it is imported to initialize db
import './database';

app.listen(3000);

console.log('Server listen on port 3000');
