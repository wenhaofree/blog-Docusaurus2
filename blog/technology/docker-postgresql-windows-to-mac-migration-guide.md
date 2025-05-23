---
slug: docker-postgresql-windows-to-mac-migration-guide
title: Windows Docker PostgreSQL 数据库迁移至 Mac 系统完整指南
date: 2025-05-11
authors: wenhao
tags: [docker, postgresql, database-migration, windows, macos, develop, cloud]
keywords: [docker, postgresql, 数据库迁移, windows, mac, develop, cloud]
image: https://image.wenhaofree.com/2025/05/993d78166982e03dd44c34d09572db81.png
# sticky: 6
---

本文将详细介绍如何将 Windows 系统上通过 Docker 运行的 PostgreSQL 数据库，完整迁移到 Mac 系统中。无论您是更换开发设备，还是需要在不同操作系统间同步数据库环境，本教程都将提供清晰的步骤指导。我们将涵盖两种主要的迁移方法：使用 SQL 备份和直接迁移数据目录，以适应不同大小的数据库和需求。
<!-- truncate -->
<img src="https://image.wenhaofree.com/2025/05/993d78166982e03dd44c34d09572db81.png"/>

### 一、在Windows上备份PostgreSQL数据
在 Windows 系统上，我们首先需要备份源 PostgreSQL 数据库。假设您在 Windows Docker中的 PostgreSQL 容器名为 `haoju-postgres`。

1. **创建数据备份**（在PowerShell中执行）：

```powershell
# 进入容器创建备份
docker exec haoju-postgres bash -c "pg_dumpall -U postgres > /var/lib/postgresql/data/backup.sql"

# 将备份文件复制到主机（请根据实际情况修改 D:\\backup.sql 为您的目标路径）
docker cp haoju-postgres:/var/lib/postgresql/data/backup.sql D:\\backup.sql

```

1. **或者直接打包整个数据目录**：

```powershell
# 创建数据目录压缩包
docker exec haoju-postgres bash -c "tar czvf /tmp/pgdata.tar.gz -C /var/lib/postgresql/data ."

# 将压缩包复制到主机（请根据实际情况修改 D:\\pgdata.tar.gz 为您的目标路径）
docker cp haoju-postgres:/tmp/pgdata.tar.gz D:\\pgdata.tar.gz

```

### 二、将备份文件传输到Mac

1. **传输方式选择**：
    - 使用U盘拷贝`backup.sql`或`pgdata.tar.gz`
    - 通过云存储（Google Drive/iCloud等）
    - 使用scp命令（如果两台机器在同一网络）：
    
    ```bash
    scp D:\\backup.sql <mac_username>@<your_mac_ip_or_hostname>:~/postgres_backup/
    # 请将 D:\\backup.sql 替换为您的实际文件路径
    # 请将 <mac_username> 替换为您的Mac用户名
    # 请将 <your_mac_ip_or_hostname> 替换为您Mac的IP地址或主机名
    # 请将 ~/postgres_backup/ 替换为您期望在Mac上存放备份的路径
    
    ```
    

### 三、在Mac上恢复数据

### 方法1：使用SQL备份恢复

1. **启动PostgreSQL容器**：
   在 Mac 上启动一个新的 PostgreSQL 容器，我们将其命名为 `mac-postgres`。

```bash
# 请将 <your_actual_password> 替换为您的数据库密码
docker run --name mac-postgres -e POSTGRES_PASSWORD=<your_actual_password> -d -p 5432:5432 postgres

```

1. **恢复数据**：

```bash
# 将备份文件复制到容器（请确保 ~/postgres_backup/backup.sql 是您之前传输到Mac的备份文件路径）
docker cp ~/postgres_backup/backup.sql mac-postgres:/tmp/

# 执行恢复（使用 postgres 用户，如果您的设置不同，请相应修改）
docker exec mac-postgres bash -c "psql -U postgres -f /tmp/backup.sql"

```

### 方法2：使用数据目录恢复（更完整）

1. **创建数据目录**：

```bash
mkdir -p ~/docker/postgres/data
tar xzvf pgdata.tar.gz -C ~/docker/postgres/data

```

1. **启动容器并挂载数据**：

```bash
docker run --name mac-postgres \\
  -e POSTGRES_PASSWORD=<your_actual_password> \\
  -v ~/docker/postgres/data:/var/lib/postgresql/data \\
  -p 5432:5432 \\
  -d postgres

```

### 四、验证迁移结果

1. **检查数据库列表**：

```bash
docker exec mac-postgres psql -U postgres -c "\\l"

# 确保使用源容器的正确用户名，这里假设是 postgres，之前有示例是 root
docker exec haoju-postgres psql -U postgres -c "\\l"
```

**检查表数据**：

```bash
docker exec mac-postgres psql -U postgres -d yourdatabase -c "\\dt+"

```

### 五、注意事项

1. **版本一致性**：
    - 确保Windows和Mac使用相同版本的PostgreSQL镜像（如都使用`postgres:15`）
2. **权限问题**：
    - Mac上可能需要调整数据目录权限：
    
    ```bash
    sudo chown -R 1000:1000 ~/docker/postgres/data
    
    ```
    
3. **服务启动**：
    - 如果使用数据目录恢复方式，首次启动可能需要较长时间进行数据校验
4. **网络配置**：
    - 确保Mac的Docker可以访问5432端口：
    
    ```bash
    lsof -i :5432
    
    ```
    

如果迁移后遇到任何问题，可以通过检查容器日志来诊断：

```bash
docker logs mac-postgres

```

这种迁移方法既保留了数据库完整性，又能确保跨平台兼容性。您可以根据数据量大小选择使用SQL备份（适合小型数据库）或完整数据目录迁移（适合大型数据库）。