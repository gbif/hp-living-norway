This small service uses Cloudflare workers to compute statistics for LivingNorway.
It can be run without Cloudflare since [workerd has been opensourced](https://blog.cloudflare.com/workerd-open-source-workers-runtime/).

# Build

```
docker build -t livingnorway-workerd .
```

Alternative for rootless Docker:

```
rootlesskit docker build -t livingnorway-workerd .
```

# Run

```
docker run --rm -p 8080:8080 livingnorway-workerd
```

# Use

Visit [localhost:8080/literature](http://localhost:8080/literature).
