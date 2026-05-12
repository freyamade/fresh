# Honu.ai
## Senior Software Engineer / Tech Lead
### September 2023 - March 2026
- Managed the building and rollout of microservices in Python, using FastAPI, onto Google Cloud Platform services like Cloud Run, or Compute Engine, using Terraform and Terragrunt.

- Helped develop, and managed, a contextual programming system for the sharing of Business Context information, which was the underlying system of the Honu Decision Infrastructure, to power decision making in context for AI Agents.

- Created a User-owned credentials proxy system for the allowance of AI Agents built by Honu/other Users to access Rest APIs for services such as Google Analytics for the User, without directly being given credentials by placing a proxy object into the Business Context system for Agents to use.

- Developed a Data Proxy system where Agents could create Data Stores in our system, using Bigquery initially but was extensible for any backend in future, and have them accessible by any other Agents in the User’s Contextual Model.

- Built a custom task-based API using FastAPI, Google Cloud Task Queues, and Redis, for running LLM powered pipelines to turn User ideas into full Business Plan for the generation of new SaaS-based SMEs.

- Created a custom Chat infrastructure for the Decision Infrastructure to allow Users and Agents to converse with the Business Context in mind, by sending messages with Business Artefacts linked to establish context for the Agent.

- Built multiple data pipelines for the ingestion of user’s analytics and metrics data from various systems into the platform for the Agents to analyse and use to make decisions. 
  - Initially using Airflow DAGs running on Google Cloud Composer, but eventually migrated to a task system running on the platform directly, leveraging the Credentials and Data proxy systems to gather data and make it natively accessible to all Agents on the system.