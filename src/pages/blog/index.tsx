import React, { useState, useEffect } from 'react';
import Link from '@docusaurus/Link';
import { PageMetadata } from '@docusaurus/theme-common';
import Layout from '@theme/Layout';
import Image from '@theme/IdealImage';
import useGlobalData from '@docusaurus/useGlobalData';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './blog.module.css';

// 定义类型
interface BlogTag {
  label: string;
  permalink: string;
}

interface BlogPost {
  permalink: string;
  title: string;
  description: string;
  date: string;
  tags: BlogTag[];
  image?: string;
}

interface BlogCategory {
  name: string;
  description: string;
  topics: string[];
}

// 博客分类数据
const blogCategories: BlogCategory[] = [
  {
    name: '前端开发',
    description: '前端技术、框架和工具的使用教程和心得',
    topics: ['React', 'Vue', 'JavaScript', 'TypeScript', 'CSS']
  },
  {
    name: '后端开发',
    description: '后端技术、服务器和数据库相关内容',
    topics: ['Java', 'Node.js', 'Python', 'Database']
  },
  {
    name: '工具教程',
    description: '开发工具和效率工具的使用技巧分享',
    topics: ['Git', 'Docker', 'VSCode', '效率工具']
  },
  {
    name: '技术分享',
    description: '技术见解、经验分享和最佳实践',
    topics: ['架构设计', '性能优化', '最佳实践']
  }
];

// 瀑布流样式
const waterfallStyles = {
  cardContainer: {
    columnCount: 2,
    columnGap: '1.5rem',
    margin: '1rem 0',
  },
  imageContainer: {
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
    paddingTop: '56.25%', /* 16:9 宽高比 */
  },
  loadingContainer: {
    textAlign: 'center',
    padding: '2rem 0',
    width: '100%',
  }
};

// 加载动画组件
function LoadingSpinner() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingDot} style={{animationDelay: '-0.32s'}}></div>
      <div className={styles.loadingDot} style={{animationDelay: '-0.16s'}}></div>
      <div className={styles.loadingDot}></div>
    </div>
  );
}

function CategoryNav() {
  return (
    <nav className={`${styles.sidebar} thin-scrollbar`}>
      <div className={`${styles.sidebarItemTitle} margin-bottom--md`}>
        博客分类
      </div>
      <ul className={`${styles.sidebarItemList} clean-list`}>
        {blogCategories.map(category => (
          <li key={category.name} className={styles.sidebarItem}>
            <Link
              to={`#${category.name}`}
              className={styles.sidebarItemLink}
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function BlogCards() {
  const globalData = useGlobalData();
  const blogPluginData = globalData?.['docusaurus-plugin-content-blog']?.['default'] || {};
  const allBlogData = blogPluginData?.blogs || [];

  // 博客数据
  const [blogItems, setBlogItems] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12); // 增加初始显示数量

  // 初始化数据 - 按发布时间倒序排序
  useEffect(() => {
    if (allBlogData.length === 0) return;
    
    setLoading(true);
    // 先转换并排序所有博客数据
    const sortedBlogData = [...allBlogData]
      .sort((a, b) => {
        // 按发布日期倒序排序（新的在前）
        const dateA = new Date(a.metadata.date);
        const dateB = new Date(b.metadata.date);
        return dateB.getTime() - dateA.getTime();
      })
      .slice(0, visibleCount)
      .map(blog => ({
        permalink: blog.metadata.permalink,
        title: blog.metadata.title,
        description: blog.metadata.description,
        date: blog.metadata.date,
        tags: blog.metadata.tags,
        image: blog.metadata.frontMatter.image,
      }));
    
    setBlogItems(sortedBlogData);
    setLoading(false);
  }, [allBlogData, visibleCount]);

  // 加载更多
  const loadMore = () => {
    if (loading || visibleCount >= allBlogData.length) return;
    
    setLoading(true);
    setTimeout(() => {
      setVisibleCount(prev => prev + 9); // 每次加载9篇文章（3列×3行）
      setLoading(false);
    }, 300); // 减少加载延迟
  };

  // 监听滚动事件
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >= 
        document.documentElement.offsetHeight - 800 && // 提早触发加载
        !loading &&
        visibleCount < allBlogData.length
      ) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, visibleCount, allBlogData.length]);

  // 格式化日期
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  return (
    <>
      {loading && blogItems.length === 0 ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className={styles.waterfallCardContainer}>
            {blogItems.map((post) => (
              <div 
                key={post.permalink}
                className={styles.blogCard}
              >
                {post.image && (
                  <div className={styles.blogCardImage}>
                    <img
                      src={post.image}
                      alt={post.title}
                      className={styles.cardImage}
                      loading="lazy" // 添加懒加载
                    />
                  </div>
                )}
                <div className={styles.blogCardContent}>
                  <h3 className={styles.blogCardTitle}>
                    <Link 
                      to={post.permalink} 
                      className={styles.blogCardLink}
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <div className={styles.blogCardTags}>
                    {post.tags?.slice(0, 3).map((tag) => (
                      <Link
                        key={tag.permalink}
                        to={tag.permalink}
                        className={styles.blogTag}
                      >
                        {tag.label}
                      </Link>
                    ))}
                  </div>
                  {post.description && (
                    <p className={styles.blogCardDescription}>
                      {post.description}
                    </p>
                  )}
                  <div className={styles.blogCardDate}>{formatDate(post.date)}</div>
                </div>
              </div>
            ))}
          </div>
          
          {/* 加载更多按钮 */}
          {visibleCount < allBlogData.length && (
            <div className={styles.loadMoreContainer}>
              <button 
                className={styles.loadMoreButton}
                onClick={loadMore}
                disabled={loading}
              >
                {loading ? '加载中...' : '加载更多'}
              </button>
            </div>
          )}
          
          {/* 加载中指示器 */}
          {loading && <LoadingSpinner />}
          
          {/* 显示加载完成信息 */}
          {visibleCount >= allBlogData.length && allBlogData.length > 0 && (
            <div className={styles.noMorePosts}>
              已加载全部文章
            </div>
          )}
        </>
      )}
    </>
  );
}

function CategoryTopics() {
  return (
    <div className={styles.categoryContainer}>
      {blogCategories.map(category => (
        <div key={category.name} className={styles.categorySection}>
          <div className={styles.categoryHeader}>
            <h2 id={category.name} className="anchor">
              {category.name}
              <a
                className="hash-link"
                href={`#${category.name}`}
                title={category.name}
              ></a>
            </h2>
            <p className={styles.categoryDescription}>{category.description}</p>
          </div>
          <div className={styles.topicsContainer}>
            {category.topics.map(topic => (
              <Link 
                key={topic} 
                to={`/tags/${topic.toLowerCase()}`}
                className={styles.topicButton}
              >
                {topic}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function BlogPage() {
  const {siteConfig} = useDocusaurusContext();
  const title = '博客';
  const description = `${siteConfig.title} 的博客 - 分享技术见解和学习心得`;

  return (
    <>
      <PageMetadata title={title} description={description} />
      <Layout>
        <div className="container margin-top--md">
          <h1 className={styles.blogTitle}>博客文章</h1>
          
          <div className="row">
            {/* <aside className="col col--2">
              <CategoryNav />
            </aside> */}
            <main className="col col--12">
              <section className={styles.blogSection}>
                <h2 className={styles.sectionTitle}>最新文章</h2>
                <BlogCards />
              </section>
            </main>
          </div>
        </div>
      </Layout>
    </>
  );
}
