import app from './app';

//  it is imported to initialize db
import './database';

app.listen(process.env.PORT);

console.log(`Server listen on port ${process.env.PORT}`);
