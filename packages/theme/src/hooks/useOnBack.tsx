import {
    BackFunction,
    useBack,
    useNavigation,
    useParsed,
    useResource,
    useRouterType,
} from "@refinedev/core";

export const useOnBack = (): BackFunction | undefined => {
    const routerType = useRouterType();
    const back = useBack();
    const { goBack } = useNavigation();
    const { action } = useParsed();

    const onBack =
        action !== "list" || typeof action !== "undefined"
            ? routerType === "legacy"
                ? goBack
                : back
            : undefined;

    return onBack;
};
