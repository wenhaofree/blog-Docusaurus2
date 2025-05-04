import clsx from 'clsx'
import React, { useState, useEffect, useRef, useCallback } from 'react'

import Link from '@docusaurus/Link'
import Image from '@theme/IdealImage'
import {
  HtmlClassNameProvider,
  PageMetadata,
  ThemeClassNames,
} from '@docusaurus/theme-common'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import BackToTopButton from '@theme/BackToTopButton'
import type { Props } from '@theme/BlogListPage'
import BlogListPaginator from '@theme/BlogListPaginator'
import type { Props as BlogPostItemsProps } from '@theme/BlogPostItems'
import BlogPostItems from '@theme/BlogPostItems'
import Layout from '@theme/Layout'
import SearchMetadata from '@theme/SearchMetadata'

import useGlobalData from '@docusaurus/useGlobalData'
import BlogInfo from '@site/src/components/BlogInfo'
import Hero from '@site/src/components/Hero'
import { BlogPost } from '@site/src/plugin/plugin-content-blog/src/types'
import { useViewType } from './useViewType'
import Translate from '@docusaurus/Translate'
import { Icon } from '@iconify/react'
import { Fade } from 'react-awesome-reveal'

// 添加瀑布流样式
const waterfallStyles = {
  cardContainer: {
    columnCount: 2,
    columnGap: '1.5rem',
    margin: '1rem 0',
  },
  cardItem: {
    breakInside: 'avoid',
    marginBottom: '1.5rem',
    borderRadius: 'var(--ifm-card-border-radius)',
    overflow: 'hidden',
    boxShadow: 'var(--ifm-global-shadow-lw)',
    transition: 'all 0.3s ease',
    backgroundColor: 'var(--ifm-card-background-color)',
  },
  cardItemHover: {
    transform: 'translateY(-5px)',
    boxShadow: 'var(--ifm-global-shadow-md)',
  },
  imageContainer: {
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
    paddingTop: '56.25%', /* 16:9 宽高比 */
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s ease',
  },
  content: {
    padding: '1rem',
  },
  title: {
    marginBottom: '0.5rem',
    fontSize: '1.2rem',
    fontWeight: 600,
  },
  titleLink: {
    color: 'var(--ifm-heading-color)',
    textDecoration: 'none',
  },
  titleLinkHover: {
    color: 'var(--ifm-color-primary)',
  },
  tagsContainer: {
    marginBottom: '0.5rem',
    display: 'flex',
    flexWrap: 'wrap',
  },
  tag: {
    padding: '0.2rem 0.5rem',
    marginRight: '0.5rem',
    marginBottom: '0.5rem',
    fontSize: '0.75rem',
    borderRadius: '1rem',
    backgroundColor: 'var(--ifm-color-primary-lightest)',
    color: 'var(--ifm-color-primary-darkest)',
    transition: '0.3s',
    whiteSpace: 'nowrap',
  },
  tagHover: {
    backgroundColor: 'var(--ifm-color-primary)',
    color: 'white',
    textDecoration: 'none',
  },
  description: {
    marginBottom: '0.75rem',
    fontSize: '0.9rem',
    color: 'var(--ifm-color-emphasis-700)',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
  },
  date: {
    fontSize: '0.8rem',
    color: 'var(--ifm-color-emphasis-600)',
  },
  loadingContainer: {
    textAlign: 'center',
    padding: '2rem 0',
    gridColumn: '1 / -1',
    width: '100%',
  },
  loadingDot: {
    display: 'inline-block',
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: 'var(--ifm-color-primary)',
    margin: '0 4px',
    opacity: 0.6,
    animation: 'loadingAnimation 1.4s infinite ease-in-out both',
  },
  loadingDot1: {
    animationDelay: '-0.32s',
  },
  loadingDot2: {
    animationDelay: '-0.16s',
  },
}

// 设置响应式断点
const mediaQueryStyles = `
@media (max-width: 768px) {
  .waterfall-card-container {
    column-count: 1 !important;
  }
}

@keyframes loadingAnimation {
  0%, 80%, 100% {
    transform: scale(0);
  } 
  40% {
    transform: scale(1.0);
  }
}
`

// 自定义Hook用于无限滚动
function useInfiniteScroll(metadata, fetchMore) {
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const observer = useRef(null);
  const loadMoreRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0]?.isIntersecting && hasMore) {
        setLoading(true);
        fetchMore(page + 1).then(hasMoreData => {
          setPage(prev => prev + 1);
          setHasMore(hasMoreData);
          setLoading(false);
        });
      }
    }, { 
      rootMargin: '200px',
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore, page, fetchMore]);

  useEffect(() => {
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  return { loading, hasMore, loadMoreRef };
}

function BlogListPageMetadata(props: Props): JSX.Element {
  const { metadata } = props
  const {
    siteConfig: { title: siteTitle },
  } = useDocusaurusContext()
  const { blogDescription, blogTitle, permalink } = metadata
  const isBlogOnlyMode = !permalink.includes('page')
  const title = isBlogOnlyMode ? '' : siteTitle

  return (
    <>
      <PageMetadata title={title} description={blogDescription} />
      <SearchMetadata tag="blog_posts_list" />
    </>
  )
}

function ViewTypeSwitch({ viewType, toggleViewType }: any): JSX.Element {
  return (
    <div className="bloghome__swith-view">
      <Icon
        icon="ph:grid-four"
        width="24"
        height="24"
        onClick={() => toggleViewType('grid')}
        color={viewType === 'grid' ? 'var(--ifm-color-primary)' : '#ccc'}
      />
      <Icon
        icon="ph:columns"
        width="24"
        height="24"
        onClick={() => toggleViewType('card')}
        color={viewType === 'card' ? 'var(--ifm-color-primary)' : '#ccc'}
      />
    </div>
  )
}

function BlogPostGridItems({ items }: BlogPostItemsProps): JSX.Element {
  return (
    <>
      {items.map(({ content: BlogPostContent }, index) => {
        const { metadata: blogMetaData, frontMatter } = BlogPostContent
        const { title } = frontMatter
        const { permalink, date, tags } = blogMetaData
        const dateObj = new Date(date)
        const dateString = `${dateObj.getFullYear()}-${(
          '0' +
          (dateObj.getMonth() + 1)
        ).slice(-2)}-${('0' + dateObj.getDate()).slice(-2)}`

        return (
          <div className="post__list-item" key={blogMetaData.permalink}>
            <Link to={permalink} className="post__list-title">
              {title}
            </Link>
            <div className="post__list-tags">
              {tags.length > 0 &&
                tags
                  .slice(0, 2)
                  .map(({ label, permalink: tagPermalink }, index) => (
                    <Link
                      key={tagPermalink}
                      className={`post__tags ${
                        index < tags.length ? 'margin-right--sm' : ''
                      }`}
                      to={tagPermalink}
                      style={{ fontSize: '0.75em', fontWeight: 500 }}
                    >
                      {label}
                    </Link>
                  ))}
            </div>
            <div className="post__list-date">{dateString}</div>
          </div>
        )
      })}
    </>
  )
}

// 加载动画组件
function LoadingSpinner() {
  return (
    <div style={{
      textAlign: 'center',
      padding: '2rem 0',
      gridColumn: '1 / -1',
      width: '100%',
    }}>
      <div 
        style={{
          display: 'inline-block',
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: 'var(--ifm-color-primary)',
          margin: '0 4px',
          opacity: 0.6,
          animation: 'loadingAnimation 1.4s infinite ease-in-out both',
          animationDelay: '-0.32s',
        }}
      ></div>
      <div 
        style={{
          display: 'inline-block',
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: 'var(--ifm-color-primary)',
          margin: '0 4px',
          opacity: 0.6,
          animation: 'loadingAnimation 1.4s infinite ease-in-out both',
          animationDelay: '-0.16s',
        }}
      ></div>
      <div 
        style={{
          display: 'inline-block',
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: 'var(--ifm-color-primary)',
          margin: '0 4px',
          opacity: 0.6,
          animation: 'loadingAnimation 1.4s infinite ease-in-out both',
        }}
      ></div>
    </div>
  );
}

// 卡片瀑布流组件
function CardWaterfallItems({ 
  items, 
  loading, 
  loadMoreRef 
}: {
  items: BlogPostItemsProps['items'],
  loading: boolean,
  loadMoreRef: (node: HTMLDivElement) => void
}): JSX.Element {
  // 添加CSS样式到head
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = mediaQueryStyles;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <>
      <div 
        className="waterfall-card-container"
        style={waterfallStyles.cardContainer}
      >
        {items.map(({ content: BlogPostContent }, index) => {
          const { metadata: blogMetaData, frontMatter } = BlogPostContent
          const { title } = frontMatter
          const { permalink, date, tags, description } = blogMetaData
          const dateObj = new Date(date)
          const dateString = `${dateObj.getFullYear()}-${(
            '0' +
            (dateObj.getMonth() + 1)
          ).slice(-2)}-${('0' + dateObj.getDate()).slice(-2)}`

          return (
            <div 
              key={blogMetaData.permalink}
              style={{
                breakInside: 'avoid',
                marginBottom: '1.5rem',
                borderRadius: 'var(--ifm-card-border-radius)',
                overflow: 'hidden',
                boxShadow: 'var(--ifm-global-shadow-lw)',
                transition: 'all 0.3s ease',
                backgroundColor: 'var(--ifm-card-background-color)'
              }}
              className="waterfall-card-item"
              onMouseEnter={(e) => {
                const target = e.currentTarget;
                target.style.transform = 'translateY(-5px)';
                target.style.boxShadow = 'var(--ifm-global-shadow-md)';
                const image = target.querySelector('.waterfall-card-image') as HTMLElement;
                if (image) {
                  image.style.transform = 'scale(1.05)';
                }
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget;
                target.style.transform = '';
                target.style.boxShadow = 'var(--ifm-global-shadow-lw)';
                const image = target.querySelector('.waterfall-card-image') as HTMLElement;
                if (image) {
                  image.style.transform = '';
                }
              }}
            >
              {frontMatter.image && (
                <div style={{
                  width: '100%',
                  overflow: 'hidden',
                  position: 'relative',
                  paddingTop: '56.25%'
                }}>
                  <Image
                    src={frontMatter.image}
                    alt={title}
                    className="waterfall-card-image"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease'
                    }}
                    img={''}
                  />
                </div>
              )}
              <div style={waterfallStyles.content}>
                <h3 style={waterfallStyles.title}>
                  <Link 
                    to={permalink} 
                    style={{
                      color: 'var(--ifm-heading-color)',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--ifm-color-primary)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--ifm-heading-color)';
                    }}
                  >
                    {title}
                  </Link>
                </h3>
                <div style={{
                  marginBottom: '0.5rem',
                  display: 'flex',
                  flexWrap: 'wrap'
                }}>
                  {tags.length > 0 &&
                    tags.slice(0, 3).map(({ label, permalink: tagPermalink }) => (
                      <Link
                        key={tagPermalink}
                        to={tagPermalink}
                        style={{
                          padding: '0.2rem 0.5rem',
                          marginRight: '0.5rem',
                          marginBottom: '0.5rem',
                          fontSize: '0.75rem',
                          borderRadius: '1rem',
                          backgroundColor: 'var(--ifm-color-primary-lightest)',
                          color: 'var(--ifm-color-primary-darkest)',
                          transition: '0.3s',
                          whiteSpace: 'nowrap'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'var(--ifm-color-primary)';
                          e.currentTarget.style.color = 'white';
                          e.currentTarget.style.textDecoration = 'none';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'var(--ifm-color-primary-lightest)';
                          e.currentTarget.style.color = 'var(--ifm-color-primary-darkest)';
                        }}
                      >
                        {label}
                      </Link>
                    ))}
                </div>
                {description && (
                  <p style={{
                    marginBottom: '0.75rem',
                    fontSize: '0.9rem',
                    color: 'var(--ifm-color-emphasis-700)',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical'
                  }}>
                    {description.slice(0, 120)}{description.length > 120 ? '...' : ''}
                  </p>
                )}
                <div style={waterfallStyles.date}>{dateString}</div>
              </div>
            </div>
          )
        })}
      </div>
      {/* 加载更多指示器 */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div ref={loadMoreRef} style={{ height: '50px', width: '100%' }}></div>
      )}
    </>
  )
}

function BlogRecommend({
  isPaginated,
  isCardView,
}: {
  isPaginated: boolean
  isCardView: boolean
}): JSX.Element {
  const globalData = useGlobalData()
  const blogPluginData = globalData?.['docusaurus-plugin-content-blog']?.[
    'default'
  ] as any

  const blogData = blogPluginData?.blogs as BlogPost[]
  const recommendedPosts = blogData
    .filter(b => (b.metadata.frontMatter.sticky as number) > 0)
    .map(b => b.metadata)
    .sort(
      (a, b) =>
        (a.frontMatter.sticky as number) - (b.frontMatter.sticky as number),
    )
    .slice(0, 8)

  if (recommendedPosts.length === 0) {
    return <></>
  }

  return (
    <>
      <div className="container-wrapper">
        <div
          className="container padding-vert--sm transition"
          style={!isCardView ? { maxWidth: 1200 } : {}}
        >
          {!isPaginated && (
            <h2 className="blog__section-title">
              <Translate id="theme.blog.title.recommend">推荐阅读</Translate>
            </h2>
          )}
          <div className="row">
            <div className="col col--12">
              <div className="bloghome__posts">
                <ul className="blog__recommend">
                  <Fade direction="up" duration={800} triggerOnce={true}>
                    {recommendedPosts.map(post => (
                      <li className={clsx('card')} key={post.permalink}>
                        {post.frontMatter.image && (
                          <div className={clsx('card__image')}>
                            <Image
                              src={post.frontMatter.image!}
                              alt={post.title}
                              img={''}
                            />
                          </div>
                        )}
                        <div className="card__body">
                          <h4>
                            <Link href={post.permalink}>{post.title}</Link>
                          </h4>
                          <p>{post.description}</p>
                        </div>
                      </li>
                    ))}
                  </Fade>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function BlogListPageContent(props: Props) {
  const { metadata, items } = props
  const isBlogOnlyMode = !metadata.permalink.includes('page')
  const isPaginated = metadata.page > 1
  const { viewType, toggleViewType } = useViewType()
  
  const isCardView = viewType === 'card'
  const isGridView = viewType === 'grid'

  // 博客数据状态管理
  const [blogItems, setBlogItems] = useState(items);
  const globalData = useGlobalData();
  const blogPluginData = globalData?.['docusaurus-plugin-content-blog']?.['default'] as any;
  const allBlogData = blogPluginData?.blogs as BlogPost[];
  
  // 获取更多博客文章的函数
  const fetchMoreItems = useCallback(async (nextPage) => {
    try {
      // 计算分页数据
      const pageSize = blogItems.length; // 使用当前页面大小作为每页数量
      const startIndex = pageSize * (nextPage - 1);
      const endIndex = startIndex + pageSize;
      
      if (startIndex >= allBlogData.length) {
        return false; // 没有更多数据
      }
      
      // 获取下一页的数据
      const nextPageData = allBlogData
        .slice(startIndex, endIndex)
        .map(blog => ({
          content: {
            metadata: blog.metadata,
            frontMatter: blog.metadata.frontMatter,
          }
        }));
      
      // 更新状态
      setBlogItems(prevItems => [...prevItems, ...nextPageData]);
      
      // 返回是否还有更多数据
      return endIndex < allBlogData.length;
    } catch (error) {
      console.error('Error fetching more items:', error);
      return false;
    }
  }, [blogItems, allBlogData]);
  
  // 使用无限滚动Hook
  const { loading, loadMoreRef } = useInfiniteScroll(metadata, fetchMoreItems);

  return (
    <Layout wrapperClassName="blog-list__page">
      {!isPaginated && isBlogOnlyMode && <Hero />}
      <BackToTopButton />

      {/* 推荐阅读 */}
      {!isPaginated && isBlogOnlyMode && (
        <BlogRecommend isPaginated={isPaginated} isCardView={isCardView} />
      )}

      {/* 最新博客 */}
      <div className="container-wrapper">
        <div
          className="container padding-vert--sm"
          style={!isCardView ? { maxWidth: 1200 } : {}}
        >
          {!isPaginated && (
            <h2 className="blog__section-title">
              <Translate id="theme.blog.title.new">最新博客</Translate>
            </h2>
          )}
          <div className="row">
            <div className={'col col--12'}>
              <ViewTypeSwitch
                viewType={viewType}
                toggleViewType={toggleViewType}
              />
            </div>
          </div>
          <div className="row">
            <div
              className={isCardView ? 'col col--9' : 'col col--12'}
              style={{ transition: 'all 0.3s ease' }}
            >
              <div className="bloghome__posts">
                {isGridView && (
                  <div className="bloghome__posts-grid">
                    <BlogPostGridItems items={blogItems} />
                  </div>
                )}
                {isCardView && (
                  <div className="bloghome__posts-card">
                    {/* 瀑布流展示 */}
                    <CardWaterfallItems 
                      items={blogItems} 
                      loading={loading} 
                      loadMoreRef={loadMoreRef}
                    />
                  </div>
                )}
                {/* 只在网格模式下显示分页器 */}
                {isGridView && <BlogListPaginator metadata={metadata} />}
              </div>
            </div>
            {isCardView && <BlogInfo />}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default function BlogListPage(props: Props): JSX.Element {
  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogListPage,
      )}
    >
      <BlogListPageMetadata {...props} />
      <BlogListPageContent {...props} />
    </HtmlClassNameProvider>
  )
}
