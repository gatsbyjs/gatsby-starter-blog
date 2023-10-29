---
title: Embrace Go Modules for Effective Dependency Management
date: "2022-11-19T13:47:00Z"
description: ""
---

A Go module is a collection of Go packages that other Go projects can easily import for development. Starting with Go 1.11, the `go` command began supporting the use of modules. From Go 1.13 onwards, module mode became the default for all development. I'd like to discuss some important aspects of importing and managing Go modules.

## Introduction

The Go packages are stored in a file tree with a __go.mod__ file at its root. Here I take [leviliangtw/ths](https://github.com/leviliangtw/ths), A lightweight Texas Holdem Server, for example: 

```go
module github.com/leviliangtw/ths

go 1.18

require (
	github.com/go-sql-driver/mysql v1.6.0
	github.com/gorilla/context v1.1.1
	github.com/gorilla/sessions v1.2.1
)

require github.com/gorilla/securecookie v1.1.1 // indirect
```

In the example, there are three important factors in the __go.mod__ file: 

1. __Module path__: module github.com/leviliangtw/ths
    - This is the import path for other projects. 
    - The path must be formatted like: [git server]/[space]/[repository]. 
2. __Golang version__: go 1.18
    - Here you should specify the Golang version of this project. 
3. __Dependency requirements__: require...
    - Other modules needed for a successful build. 
    - Written as a module path and a specific semantic version. 
    - Dependency version is of the format like v.x.x.x. 

## Usages
Here I take the [leviliangtw/ths](https://github.com/leviliangtw/ths) for example again. 

First of all, now you are going to manage the modules of the Golang project, and it time to create a new module of itself: 

```bash
$ go mod init github.com/leviliangtw/Texas-Holdem-Server
go: creating new go.mod: module github.com/leviliangtw/Texas-Holdem-Server
go: to add module requirements and sums:
go mod tidy
```

When you run or test the project, the go command would automatically looks up the module containing that package and adds it to go.mod, using the latest version. Here you could also use `go mod tidy` for the same purpose: 

```bash
$ go mod tidy
go: finding module for package github.com/gorilla/sessions
go: finding module for package github.com/go-sql-driver/mysql
go: finding module for package github.com/gorilla/context
go: found github.com/go-sql-driver/mysql in github.com/go-sql-driver/mysql v1.6.0
go: found github.com/gorilla/context in github.com/gorilla/context v1.1.1
go: found github.com/gorilla/sessions in github.com/gorilla/sessions v1.2.1
```

Now you check the file __go.mod__ and will get: 

```bash
$ cat go.mod
module github.com/leviliangtw/ths

go 1.18

require (
    github.com/go-sql-driver/mysql v1.6.0
    github.com/gorilla/context v1.1.1
    github.com/gorilla/sessions v1.2.1
)

require github.com/gorilla/securecookie v1.1.1 // indirect
```

Then, you also could check its dependencies directly: 

```bash
$ go list -m all
github.com/leviliangtw/Texas-Holdem-Server
github.com/go-sql-driver/mysql v1.6.0
github.com/gorilla/context v1.1.1
github.com/gorilla/securecookie v1.1.1
github.com/gorilla/sessions v1.2.1
```

If you would like to use a module of a specified version, you can use `go get`: 

```bash
$ go list -m -versions github.com/go-sql-driver/mysql
github.com/go-sql-driver/mysql v1.0.0 v1.0.1 v1.0.2 v1.0.3 v1.1.0 v1.2.0 v1.3.0 v1.4.0 v1.4.1 v1.5.0 v1.6.0

$ go get github.com/go-sql-driver/mysql@v1.5.0
go: downloading github.com/go-sql-driver/mysql v1.5.0
go: downgraded github.com/go-sql-driver/mysql v1.6.0 => v1.5.0
```

Finally, don't forget that you can cleans up unused dependencies by `go mod tidy`!

## Cheat Sheet

- `go mod init`
    - creates a new module and initialize the go.mod file
- `go run`, `go build`, `go test`, `go mod tidy`, etc. 
    - add needed dependencies to go.mod
- `go list -m all` 
    - print the current module’s dependencies
- `go get` 
    - change or add the required version of a dependency
- `go mod tidy` 
    - remove unused dependencies

## References

* [Effective Go - The Go Programming Language](https://go.dev/doc/effective_go)
* [Using Go Modules - The Go Programming Language](https://go.dev/blog/using-go-modules)