---
slug: postgresql-rename-database-guide
title: PostgreSQL 数据库重命名教程：安全高效的操作方法
date: 2025-05-11
authors: wenhao
tags: [postgresql, database, sql, tutorial, rename, dba]
keywords: [PostgreSQL, 数据库重命名, ALTER DATABASE, SQL, 教程, 数据库管理]
image: https://images.ctfassets.net/23aumh6u8s0i/UcNpv8qg2DefvV0dZDddy/c9cb18d5b0684cd00f28f73cde7a0298/postgreSQL.png
---

<!-- truncate -->

在 PostgreSQL 中修改数据库名称，主要使用 `ALTER DATABASE` 命令，但需确保操作时目标数据库无活动连接。以下是具体步骤和注意事项：

### 1. **终止所有活动连接**
   - 必须强制断开所有连接到目标数据库的会话，否则重命名会失败。可通过以下命令实现：
     ```sql
     SELECT pg_terminate_backend(pg_stat_activity.pid)
     FROM pg_stat_activity
     WHERE pg_stat_activity.datname = '原数据库名';
     ```
     此命令会终止所有非当前会话的连接。

### 2. **切换到其他数据库**
   - 不能在当前连接的数据库中执行重命名操作，需先切换到其他数据库（如 `postgres`）：
     ```sql
     \c postgres  -- 在 psql 中切换
     ```
     或通过命令行直接连接其他数据库。

### 3. **执行重命名命令**
   - 使用 `ALTER DATABASE` 语法：
     ```sql
     ALTER DATABASE 原数据库名 RENAME TO 新数据库名;
     ```
     例如：`ALTER DATABASE old_db RENAME TO new_db;`。

### 4. **验证结果**
   - 重命名后可通过 `\l` 命令查看所有数据库列表，确认名称已更新。

### 其他注意事项
   - **权限要求**：执行命令的用户需是数据库所有者或超级用户，且拥有 `CREATEDB` 权限。
   - **备份建议**：尽管 `ALTER DATABASE` 是原子操作，但重大修改前建议备份数据。
   - **替代方案**：若因权限或连接问题无法直接重命名，可通过 `pg_dump` 导出数据并导入到新数据库，再删除旧数据库。

### 官方语法参考
PostgreSQL 文档明确说明 `ALTER DATABASE` 的 `RENAME TO` 子句是唯一直接支持重命名的方式，且强调当前数据库不可重命名。