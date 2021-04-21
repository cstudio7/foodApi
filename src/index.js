import app from './app';

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Magic runs  on http://localhost:${port}`);
});

export default app;
