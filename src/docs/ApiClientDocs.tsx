import React, { useCallback, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Input,
  useApi,
  useApiMutation,
  type AppApiError,
} from "../index";

const API_BASE = "https://jsonplaceholder.typicode.com";

const ApiClientDocs: React.FC = () => {
  const [postId, setPostId] = useState("1");
  const [formState, setFormState] = useState({
    title: "",
    body: "",
  });

  const {
    data: postData,
    loading: loadingPost,
    error: postError,
    refetch: refetchPost,
  } = useApi<{ id: number; title: string; body: string }>({
    url: `${API_BASE}/posts/${postId || 1}`,
    method: "get",
    enabled: false,
    queryKey: "docs.posts.detail",
    onError: (error) => {
      console.warn("Example query error", error);
    },
  });

  const {
    data: createdPost,
    loading: creatingPost,
    error: createError,
    mutateAsync: createPost,
    reset: resetMutation,
  } = useApiMutation<{ id: number; title: string; body: string }>({
    url: `${API_BASE}/posts`,
    method: "post",
    invalidateKeys: ["docs.posts.detail"],
    onSuccess: () => {
      // Invalidate re-executes the query registered under the same key.
      setFormState({ title: "", body: "" });
    },
  });

  const handleFetchPost = useCallback(() => {
    void refetchPost();
  }, [refetchPost]);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
        await createPost({
          data: {
            title: formState.title,
            body: formState.body,
            userId: 1,
          },
        });
      } catch (error) {
        console.info("Example mutation error", error);
      }
    },
    [createPost, formState.body, formState.title],
  );

  const renderErrorBadge = (error?: AppApiError) => {
    if (!error) return null;
    return (
      <Badge variant="danger" icon="fa fa-exclamation-triangle">
        {error.message}
      </Badge>
    );
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <Card title="ApiClient - Resumen">
        <div className="space-y-4">
          <p style={{ color: "var(--flysoft-text-secondary)" }}>
            La capa de networking usa <code>axios</code> con interceptores
            listos para inyectar tokens y normalizar errores en
            <code>AppApiError</code>. Importa los estilos con
            <code>import &quot;flysoft-react-ui/styles&quot;;</code> y consume
            <code>apiClient</code>,
            <code>useApi</code> y <code>useApiMutation</code> directamente desde
            la librería.
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>
              Métodos disponibles: <code>get</code>, <code>post</code>,
              <code>put</code>, <code>delete</code> y <code>patch</code> con
              opciones tipadas.
            </li>
            <li>
              Los errores se entregan como <code>AppApiError</code> para que los
              componentes usen badges, alerts u otros patrones ya disponibles
              sin tocar los hooks.
            </li>
            <li>
              Usa <code>setApiClientTokenProvider</code> para inyectar tokens
              (placeholder listo para integrarse con tu ThemeProvider o
              contextos existentes).
            </li>
          </ul>
        </div>
      </Card>

      <Card title="Consulta simple con useApi">
        <div className="space-y-6">
          <form
            className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4 items-end"
            onSubmit={(event) => {
              event.preventDefault();
              handleFetchPost();
            }}
          >
            <Input
              label="ID del post"
              icon="fa fa-hashtag"
              value={postId}
              onChange={(event) => setPostId(event.target.value)}
            />
            <Button
              type="submit"
              variant="primary"
              icon="fa fa-search"
              loading={loadingPost}
            >
              Consultar
            </Button>
          </form>

          <div className="space-y-3">
            {loadingPost && (
              <Badge variant="info" icon="fa fa-spinner" className="animate-pulse">
                Cargando post...
              </Badge>
            )}
            {renderErrorBadge(postError)}
            {postData && !loadingPost && (
              <Card title={`Post ${postData.id}`}>
                <div className="space-y-2">
                  <h4
                    className="text-lg font-semibold"
                    style={{ color: "var(--flysoft-text-primary)" }}
                  >
                    {postData.title}
                  </h4>
                  <p style={{ color: "var(--flysoft-text-secondary)" }}>
                    {postData.body}
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </Card>

      <Card title="Mutación con useApiMutation">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Título"
              icon="fa fa-heading"
              value={formState.title}
              onChange={(event) =>
                setFormState((prev) => ({
                  ...prev,
                  title: event.target.value,
                }))
              }
            />
            <Input
              label="Contenido"
              icon="fa fa-align-left"
              value={formState.body}
              onChange={(event) =>
                setFormState((prev) => ({
                  ...prev,
                  body: event.target.value,
                }))
              }
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              type="submit"
              variant="primary"
              icon="fa fa-paper-plane"
              loading={creatingPost}
            >
              Enviar datos
            </Button>
            <Button
              type="button"
              variant="outline"
              icon="fa fa-undo"
              onClick={() => {
                setFormState({ title: "", body: "" });
                resetMutation();
              }}
            >
              Reiniciar
            </Button>
          </div>

          <div className="space-y-3">
            {creatingPost && (
              <Badge variant="info" icon="fa fa-spinner" className="animate-pulse">
                Enviando...
              </Badge>
            )}
            {renderErrorBadge(createError)}
            {createdPost && !creatingPost && (
              <Badge variant="success" icon="fa fa-check-circle">
                Post #{createdPost.id} creado (ejemplo).
              </Badge>
            )}
            <p className="text-sm" style={{ color: "var(--flysoft-text-secondary)" }}>
              Usa <code>invalidateKeys</code> para refrescar queries que hayan
              sido registradas con <code>queryKey</code> en <code>useApi</code>.
              Esto permite mantener badges y alerts sincronizados con el estado
              de la UI sin alterar los hooks.
            </p>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ApiClientDocs;


