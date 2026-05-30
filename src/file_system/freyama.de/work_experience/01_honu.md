# Honu.ai
## Lead Backend Developer
### September 2023 - March 2026
- Architected a zero-trust credentials proxy system allowing AI agents to securely interact with third-party APIs (e.g., Google Analytics) without exposing raw credentials.

- Primary backend owner for the Decision Infrastructure, balancing high-security requirements with seamless agent integration across GCP services.

- Managed the building and rollout of microservices in Python, using FastAPI, onto Google Cloud Platform services like Cloud Run, or Compute Engine, using Terraform and Terragrunt.

- Helped develop, and managed, a contextual programming system for the sharing of Business Context information, which was the underlying system of the Honu Decision Infrastructure, to power decision making in context for AI Agents.

- Developed a Data Proxy system where Agents could create Data Stores in our system, using Bigquery initially but was extensible for any backend in future, and have them accessible by any other Agents in the User’s Contextual Model.

- Built a custom task-based API using FastAPI, Google Cloud Task Queues, and Redis, for running LLM powered pipelines to turn User ideas into full Business Plan for the generation of new SaaS-based SMEs.

- Created a custom Chat infrastructure for the Decision Infrastructure to allow Users and Agents to converse with the Business Context in mind, by sending messages with Business Artefacts linked to establish context for the Agent.

- Built multiple data pipelines for the ingestion of user’s analytics and metrics data from various systems into the platform for the Agents to analyse and use to make decisions. 
  - Initially using Airflow DAGs running on Google Cloud Composer, but eventually migrated to a task system running on the platform directly, leveraging the Credentials and Data proxy systems to gather data and make it natively accessible to all Agents on the system.