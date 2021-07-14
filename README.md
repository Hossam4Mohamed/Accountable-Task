<h1  align="center"> Accountable Task Backend </h1>

## Table of Contents

- [Introduction](#introduction)

- [Tech Stack](#tech-stack)

- [Process Flowchart](#process-flowchart)

- [Architecture](#architecture)

- [Database Models](#database-models)

- [Requirements](#requirements)

- [Additional Resources](#additional-resources)

## Introduction

This project is a submission for a task sent by [Accountable](https://www.accountable.eu/) for the recruitment process for a senior software job vacancy.

As an accounting app, it is required to fetch users transactions for a bank account following these instructions:

- Each user has one bank account connected
- For each bank account, I must fetch new transactions at regular intervals and store them in DB
- This operation should be done in the background as a scheduled job
- Users can have a custom transaction fetching interval as every hour every 3 hours and every 6 hours the default value is every hour

> **_NOTE:_** I made it on minute base for the sake of testing

- Handle errors from bank API. There are 2 possible errors
  - technicalFailure means the bank is unavailable that should be logged to a file. In that case, retry to fetch transactions next time.
  - authorizationFailed means the access token is no longer valid. In that case, don't fetch new transactions until the user has manually updated his connection to get a new token.
- I must use a queue system like rabbitMQ to run the synchronizations

## Tech Stack

- [Nodejs](https://nodejs.org/) combined with [TypeScript](https://www.typescriptlang.org) and [Expressjs](https://expressjs.com) as minimal web framework
- Database Used is [MongoDB](https://www.mongodb.com/) combined with [Mongoose](https://mongoosejs.com/) as ODM
- [RabbitMQ](https://www.rabbitmq.com/) as message broker

## Process Flowchart

![Alt text](docs/Architecture-FlowChart.png?raw=true)

## Architecture

The project makes full use of the **Restful APIs style** along side with Service Oriented Architecture **SOA** and it has two main services

- ### Business Logic Service:

  - It provides restful api interface for end-users to authenticate, add banks accounts (one for each bank) and get latest transactions based on their preference interval

  - It also run scheduled cron job to scan the accounts that the system should fetch their related transactions based on the interval set by the user and publish them to rabbitMQ queue to be consumed by workers

  - It also provides restful api interface for workers to store the transactions fetched in the background and store the tasks of synchronization status.

- ### Bank API Service:

  - It provides restful api interface for end-users to refresh tokens to enable any other service to fetch latest transactions based

- ### Worker Service:

  - It is more than one instance that listen to task queue waiting for the accounts to fetch their related transactions from the bank API.

## Database Models:

![Alt text](docs/Architecture-Models.png?raw=true)

## Requirements

An internet connection of course :).

### Local

- Nodejs v12.14.0
- Npm v6.13.4

### Docker

- Docker version 19.03.2
- docker-compose version 1.21.0

  #### Docker Instructions

  Change directory to the project's root (where `docker-compose.yml` is ) and run the following command which will build the images if the images **do not exist** and starts the containers.

  When ready, run it:

  ```bash
  $ docker-compose up --scale worker=5
  ```

  - the option `scale` refer to the number of instances that will be run of certain service
  - Business Logic service will run by default on port `3000`, and is accessible from `http://localhost:3000`
  - Bank API will run by default on port `4000`, and is accessible from `http://localhost:4000`
  - RabbitMQ Manage Interface will be accessible from `http://localhost:15672`

### Additional Resources

- [Postman Collection Link: Local or Docker](https://www.getpostman.com/collections/7f7183970966924c9c6a)
