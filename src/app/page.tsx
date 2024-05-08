'use client'

import { useAppDispatch, useAppSelector } from "@/store/features/hooks";
import { useEffect, useState } from "react";
import styles from './page.module.scss'
import Layout from "@/components/layout/layout";
import RecipeCard from "@/components/ui/RecipeCard/RecipeCard";
import { IRecipe } from "@/store/features/recipes/recipes.types";
import { useRecipes } from "@/hooks/useRecipes";
import { fetchFeedPagesDynamic } from "@/store/features/recipes/recipes.actions";
import { Loader } from "@/components/ui/Loader/Loader";
import { useAuth } from "@/hooks/useAuth";
import EmptyRecipeList from "@/components/ui/RecipeList/EmptyRecipeList";

//todo: криво работает подгрузка бесконечного списка - неправильно определяется элемент, на котором надо скролить. Без внутреннего скрола все ОК

export default function Home() {
    const { isAuth } = useAuth()
    const recipe = useRecipes()
    const recipes = useAppSelector((state) => state.recipesFeed)
    const { view } = useAppSelector((state) => state.recipesFeed)
    const dispatch = useAppDispatch();
    const [containerStyles, setContainerStyles] = useState<string[]>([
        styles.wrapper,
    ])

    const [isScroll, setIsScroll] = useState(false); // Флаг 
    
    useEffect(() => {
        const newStyles = [styles.wrapper]
        if (view === 'tile') {
          newStyles.push(styles.tile)
        }
        setContainerStyles(newStyles)
      }, [view])

    //todo: плохая реализация: трата ресурсов на обработку каждого скрола   
    useEffect(() => {
        const handleScroll = () => {
            // Проверка на загрузку и достижение нижней части страницы. Добавил 10px для надежного распознавания конца страницы
            if (isScroll || window.innerHeight + document.documentElement.scrollTop + 10 < document.documentElement.offsetHeight) return;

            setIsScroll(true); // Установка флага загрузки


            if (recipes.sort === "default") {
                if (recipes.recipes.feed.nextPage) dispatch(fetchFeedPagesDynamic({
                    sort: recipes.sort,
                    url: recipes.recipes.feed.nextPage
                }))
                    .finally(() => setIsScroll(false))
            } else if (recipes.sort === "top") {
                if (recipes.recipes.feedActivity.nextPage) dispatch(fetchFeedPagesDynamic({
                    sort: recipes.sort,
                    url: recipes.recipes.feedActivity.nextPage
                }))
                    .finally(() => setIsScroll(false))
            } else if (isAuth && recipes.sort === "subscribe") {
                if (recipes.recipes.feedSubscriptions.nextPage) dispatch(fetchFeedPagesDynamic({
                    sort: recipes.sort,
                    url: recipes.recipes.feedSubscriptions.nextPage
                }))
                    .finally(() => setIsScroll(false))
            }

        }


        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [dispatch, isScroll, recipes]);

    return (
        <Layout isSearch={true}>
                <div className={`${styles.container} scroll scroll--left scroll__thin`}>
                    <div className={containerStyles.join(' ')}>
                        {recipe?.length &&
                            recipe?.map((recipe: IRecipe) => (
                                <RecipeCard key={recipe.id} recipe={recipe} />
                            ))}
                        {recipes?.isLoading ? <Loader />
                            : recipes.sort === "subscribe" && !isAuth ? <div>Авторизуйтесь :(</div> :
                                !recipe?.length &&
                                <EmptyRecipeList />}
                    </div>
                </div>
        </Layout>
    )
}
