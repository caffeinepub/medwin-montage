import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Database, Film, Loader2, LogOut, Shield } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useAdmin } from "../contexts/AdminContext";
import {
  useAddBrand,
  useAddFAQ,
  useAddPricingPlan,
  useAddService,
  useAddTestimonial,
  useAddVideo,
  useGetAllBrands,
  useGetAllContactEnquiries,
  useGetAllFAQs,
  useGetAllPricingPlans,
  useGetAllServices,
  useGetAllTestimonials,
  useGetAllVideos,
  useGetOfficeProfile,
  useSeedData,
  useToggleBrandPublished,
  useToggleFAQPublished,
  useTogglePricingPublished,
  useToggleServicePublished,
  useToggleTestimonialPublished,
  useToggleVideoPublished,
  useUpdateBrand,
  useUpdateOfficeProfile,
  useUpdatePricingPlan,
  useUpdateService,
  useUpdateVideo,
} from "../hooks/useQueries";

// ─── Login Screen ──────────────────────────────────────────────────────────

function LoginScreen() {
  const { login } = useAdmin();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const ok = login(password);
      if (!ok) {
        setError("Invalid password. Please try again.");
        setLoading(false);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="p-4 bg-gold/10 rounded-full border border-gold/30 mb-4">
            <Shield className="w-8 h-8 text-gold" />
          </div>
          <div className="flex items-center gap-2 mb-2">
            <Film className="w-5 h-5 text-gold" />
            <span className="font-display text-xl font-bold text-gold tracking-widest uppercase">
              Medwin
            </span>
            <span className="font-display text-xl font-bold text-foreground tracking-widest uppercase">
              Montage
            </span>
          </div>
          <p className="text-muted-foreground text-sm">Admin Panel</p>
        </div>
        <form
          onSubmit={handleLogin}
          className="bg-card border border-border rounded-sm p-6 space-y-5"
          data-ocid="admin.modal"
        >
          <div>
            <Label
              htmlFor="admin-password"
              className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block"
            >
              Admin Password
            </Label>
            <Input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="Enter admin password"
              className="bg-background border-border focus:border-gold"
              data-ocid="admin.input"
            />
          </div>
          {error && (
            <p
              className="text-destructive text-sm"
              data-ocid="admin.error_state"
            >
              {error}
            </p>
          )}
          <Button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-gold text-primary-foreground hover:bg-gold-light uppercase tracking-widest text-sm py-5 rounded-sm"
            data-ocid="admin.submit_button"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            {loading ? "Authenticating..." : "Admin Login"}
          </Button>
        </form>
      </div>
    </div>
  );
}

// ─── Publish Badge ─────────────────────────────────────────────────────────

function PublishBadge({ published }: { published: boolean }) {
  return (
    <Badge
      variant={published ? "default" : "secondary"}
      className={published ? "bg-green-600 text-white" : ""}
    >
      {published ? "Published" : "Draft"}
    </Badge>
  );
}

// ─── Videos Tab ────────────────────────────────────────────────────────────

function VideosTab() {
  const { data: videos = [], isLoading } = useGetAllVideos();
  const addVideo = useAddVideo();
  const updateVideo = useUpdateVideo();
  const togglePublish = useToggleVideoPublished();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<(typeof videos)[0] | null>(null);
  const [form, setForm] = useState({
    title: "",
    vimeoId: "",
    category: "",
    description: "",
  });

  const openAdd = () => {
    setEditItem(null);
    setForm({ title: "", vimeoId: "", category: "", description: "" });
    setDialogOpen(true);
  };
  const openEdit = (v: (typeof videos)[0]) => {
    setEditItem(v);
    setForm({
      title: v.title,
      vimeoId: v.vimeoId,
      category: v.category,
      description: v.description,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      if (editItem) {
        await updateVideo.mutateAsync({
          id: editItem.id,
          title: form.title,
          vimeoId: form.vimeoId,
          category: form.category,
          description: form.description,
          published: editItem.published,
        });
        toast.success("Video updated");
      } else {
        await addVideo.mutateAsync(form);
        toast.success("Video added");
      }
      setDialogOpen(false);
    } catch {
      toast.error("Failed to save");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-gold font-semibold uppercase tracking-widest text-sm">
          Portfolio Videos
        </h2>
        <Button
          onClick={openAdd}
          className="bg-gold text-primary-foreground hover:bg-gold-light text-xs uppercase tracking-widest rounded-sm"
          data-ocid="admin.primary_button"
        >
          + Add Video
        </Button>
      </div>
      {isLoading ? (
        <div
          className="flex items-center justify-center py-12"
          data-ocid="admin.loading_state"
        >
          <Loader2 className="animate-spin text-gold" />
        </div>
      ) : (
        <Table data-ocid="admin.table">
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Vimeo ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {videos.map((v, i) => (
              <TableRow key={String(v.id)} data-ocid={`admin.item.${i + 1}`}>
                <TableCell className="font-medium">{v.title}</TableCell>
                <TableCell>{v.category}</TableCell>
                <TableCell className="text-muted-foreground text-xs">
                  {v.vimeoId}
                </TableCell>
                <TableCell>
                  <PublishBadge published={v.published} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={v.published}
                      onCheckedChange={() => togglePublish.mutate(v.id)}
                      data-ocid={`admin.toggle.${i + 1}`}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEdit(v)}
                      className="text-xs border-border"
                      data-ocid={`admin.edit_button.${i + 1}`}
                    >
                      Edit
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {videos.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center text-muted-foreground py-8"
                  data-ocid="admin.empty_state"
                >
                  No videos yet. Click + Add Video to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent
          className="bg-card border-border"
          data-ocid="admin.dialog"
        >
          <DialogHeader>
            <DialogTitle className="text-gold">
              {editItem ? "Edit Video" : "Add Video"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">
                Title
              </Label>
              <Input
                value={form.title}
                onChange={(e) =>
                  setForm((p) => ({ ...p, title: e.target.value }))
                }
                className="bg-background border-border"
                data-ocid="admin.input"
              />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">
                Category
              </Label>
              <Input
                value={form.category}
                onChange={(e) =>
                  setForm((p) => ({ ...p, category: e.target.value }))
                }
                className="bg-background border-border"
                data-ocid="admin.input"
              />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">
                Vimeo ID
              </Label>
              <Input
                value={form.vimeoId}
                onChange={(e) =>
                  setForm((p) => ({ ...p, vimeoId: e.target.value }))
                }
                placeholder="e.g. 1176462678"
                className="bg-background border-border"
                data-ocid="admin.input"
              />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">
                Description
              </Label>
              <Textarea
                value={form.description}
                onChange={(e) =>
                  setForm((p) => ({ ...p, description: e.target.value }))
                }
                className="bg-background border-border"
                data-ocid="admin.textarea"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              className="border-border"
              data-ocid="admin.cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={addVideo.isPending || updateVideo.isPending}
              className="bg-gold text-primary-foreground hover:bg-gold-light"
              data-ocid="admin.save_button"
            >
              {addVideo.isPending || updateVideo.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Save"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ─── Brands Tab ────────────────────────────────────────────────────────────

function BrandsTab() {
  const { data: brands = [], isLoading } = useGetAllBrands();
  const addBrand = useAddBrand();
  const updateBrand = useUpdateBrand();
  const togglePublish = useToggleBrandPublished();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<(typeof brands)[0] | null>(null);
  const [form, setForm] = useState({
    name: "",
    category: "",
    location: "",
    description: "",
    mapsUrl: "",
  });

  const openAdd = () => {
    setEditItem(null);
    setForm({
      name: "",
      category: "",
      location: "",
      description: "",
      mapsUrl: "",
    });
    setDialogOpen(true);
  };
  const openEdit = (b: (typeof brands)[0]) => {
    setEditItem(b);
    setForm({
      name: b.name,
      category: b.category,
      location: b.location,
      description: b.description,
      mapsUrl: b.mapsUrl,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      if (editItem) {
        await updateBrand.mutateAsync({ id: editItem.id, brand: form });
        toast.success("Brand updated");
      } else {
        await addBrand.mutateAsync(form);
        toast.success("Brand added");
      }
      setDialogOpen(false);
    } catch {
      toast.error("Failed to save");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-gold font-semibold uppercase tracking-widest text-sm">
          Brand Partners
        </h2>
        <Button
          onClick={openAdd}
          className="bg-gold text-primary-foreground hover:bg-gold-light text-xs uppercase tracking-widest rounded-sm"
          data-ocid="admin.primary_button"
        >
          + Add Brand
        </Button>
      </div>
      {isLoading ? (
        <div
          className="flex items-center justify-center py-12"
          data-ocid="admin.loading_state"
        >
          <Loader2 className="animate-spin text-gold" />
        </div>
      ) : (
        <Table data-ocid="admin.table">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {brands.map((b, i) => (
              <TableRow key={String(b.id)} data-ocid={`admin.item.${i + 1}`}>
                <TableCell className="font-medium">{b.name}</TableCell>
                <TableCell>{b.category}</TableCell>
                <TableCell>{b.location}</TableCell>
                <TableCell>
                  <PublishBadge published={b.published} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={b.published}
                      onCheckedChange={() => togglePublish.mutate(b.id)}
                      data-ocid={`admin.toggle.${i + 1}`}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEdit(b)}
                      className="text-xs border-border"
                      data-ocid={`admin.edit_button.${i + 1}`}
                    >
                      Edit
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {brands.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center text-muted-foreground py-8"
                  data-ocid="admin.empty_state"
                >
                  No brands yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent
          className="bg-card border-border"
          data-ocid="admin.dialog"
        >
          <DialogHeader>
            <DialogTitle className="text-gold">
              {editItem ? "Edit Brand" : "Add Brand"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">
                Name
              </Label>
              <Input
                value={form.name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, name: e.target.value }))
                }
                className="bg-background border-border"
                data-ocid="admin.input"
              />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">
                Category
              </Label>
              <Input
                value={form.category}
                onChange={(e) =>
                  setForm((p) => ({ ...p, category: e.target.value }))
                }
                className="bg-background border-border"
                data-ocid="admin.input"
              />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">
                Location
              </Label>
              <Input
                value={form.location}
                onChange={(e) =>
                  setForm((p) => ({ ...p, location: e.target.value }))
                }
                className="bg-background border-border"
                data-ocid="admin.input"
              />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">
                Description
              </Label>
              <Textarea
                value={form.description}
                onChange={(e) =>
                  setForm((p) => ({ ...p, description: e.target.value }))
                }
                className="bg-background border-border"
                data-ocid="admin.textarea"
              />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">
                Google Maps URL
              </Label>
              <Input
                value={form.mapsUrl}
                onChange={(e) =>
                  setForm((p) => ({ ...p, mapsUrl: e.target.value }))
                }
                className="bg-background border-border"
                data-ocid="admin.input"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              className="border-border"
              data-ocid="admin.cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={addBrand.isPending || updateBrand.isPending}
              className="bg-gold text-primary-foreground hover:bg-gold-light"
              data-ocid="admin.save_button"
            >
              {addBrand.isPending || updateBrand.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Save"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ─── Services Tab ──────────────────────────────────────────────────────────

function ServicesTab() {
  const { data: services = [], isLoading } = useGetAllServices();
  const addService = useAddService();
  const updateService = useUpdateService();
  const togglePublish = useToggleServicePublished();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<(typeof services)[0] | null>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    featuresRaw: "",
  });

  const openAdd = () => {
    setEditItem(null);
    setForm({ title: "", description: "", featuresRaw: "" });
    setDialogOpen(true);
  };
  const openEdit = (s: (typeof services)[0]) => {
    setEditItem(s);
    setForm({
      title: s.title,
      description: s.description,
      featuresRaw: s.features.join("\n"),
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    const features = form.featuresRaw
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean);
    try {
      if (editItem) {
        await updateService.mutateAsync({
          id: editItem.id,
          title: form.title,
          description: form.description,
          features,
        });
        toast.success("Service updated");
      } else {
        await addService.mutateAsync({
          title: form.title,
          description: form.description,
          features,
        });
        toast.success("Service added");
      }
      setDialogOpen(false);
    } catch {
      toast.error("Failed to save");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-gold font-semibold uppercase tracking-widest text-sm">
          Services
        </h2>
        <Button
          onClick={openAdd}
          className="bg-gold text-primary-foreground hover:bg-gold-light text-xs uppercase tracking-widest rounded-sm"
          data-ocid="admin.primary_button"
        >
          + Add Service
        </Button>
      </div>
      {isLoading ? (
        <div
          className="flex items-center justify-center py-12"
          data-ocid="admin.loading_state"
        >
          <Loader2 className="animate-spin text-gold" />
        </div>
      ) : (
        <Table data-ocid="admin.table">
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((s, i) => (
              <TableRow key={String(s.id)} data-ocid={`admin.item.${i + 1}`}>
                <TableCell className="font-medium">{s.title}</TableCell>
                <TableCell className="text-muted-foreground text-sm max-w-xs truncate">
                  {s.description}
                </TableCell>
                <TableCell>
                  <PublishBadge published={s.published} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={s.published}
                      onCheckedChange={() => togglePublish.mutate(s.id)}
                      data-ocid={`admin.toggle.${i + 1}`}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEdit(s)}
                      className="text-xs border-border"
                      data-ocid={`admin.edit_button.${i + 1}`}
                    >
                      Edit
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {services.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center text-muted-foreground py-8"
                  data-ocid="admin.empty_state"
                >
                  No services yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent
          className="bg-card border-border"
          data-ocid="admin.dialog"
        >
          <DialogHeader>
            <DialogTitle className="text-gold">
              {editItem ? "Edit Service" : "Add Service"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">
                Title
              </Label>
              <Input
                value={form.title}
                onChange={(e) =>
                  setForm((p) => ({ ...p, title: e.target.value }))
                }
                className="bg-background border-border"
                data-ocid="admin.input"
              />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">
                Description
              </Label>
              <Textarea
                value={form.description}
                onChange={(e) =>
                  setForm((p) => ({ ...p, description: e.target.value }))
                }
                className="bg-background border-border"
                data-ocid="admin.textarea"
              />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">
                Features (one per line)
              </Label>
              <Textarea
                value={form.featuresRaw}
                onChange={(e) =>
                  setForm((p) => ({ ...p, featuresRaw: e.target.value }))
                }
                rows={5}
                className="bg-background border-border"
                data-ocid="admin.textarea"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              className="border-border"
              data-ocid="admin.cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={addService.isPending || updateService.isPending}
              className="bg-gold text-primary-foreground hover:bg-gold-light"
              data-ocid="admin.save_button"
            >
              {addService.isPending || updateService.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Save"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ─── Pricing Tab ───────────────────────────────────────────────────────────

function PricingTab() {
  const { data: plans = [], isLoading } = useGetAllPricingPlans();
  const addPlan = useAddPricingPlan();
  const updatePlan = useUpdatePricingPlan();
  const togglePublish = useTogglePricingPublished();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<(typeof plans)[0] | null>(null);
  const [form, setForm] = useState({ planLabel: "", price: "", note: "" });

  const openAdd = () => {
    setEditItem(null);
    setForm({ planLabel: "", price: "", note: "" });
    setDialogOpen(true);
  };
  const openEdit = (p: (typeof plans)[0]) => {
    setEditItem(p);
    setForm({ planLabel: p.planLabel, price: String(p.price), note: p.note });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      const planData = {
        planLabel: form.planLabel,
        price: BigInt(form.price || "0"),
        note: form.note,
      };
      if (editItem) {
        await updatePlan.mutateAsync({ id: editItem.id, plan: planData });
        toast.success("Plan updated");
      } else {
        await addPlan.mutateAsync(planData);
        toast.success("Plan added");
      }
      setDialogOpen(false);
    } catch {
      toast.error("Failed to save");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-gold font-semibold uppercase tracking-widest text-sm">
          Pricing Plans
        </h2>
        <Button
          onClick={openAdd}
          className="bg-gold text-primary-foreground hover:bg-gold-light text-xs uppercase tracking-widest rounded-sm"
          data-ocid="admin.primary_button"
        >
          + Add Plan
        </Button>
      </div>
      {isLoading ? (
        <div
          className="flex items-center justify-center py-12"
          data-ocid="admin.loading_state"
        >
          <Loader2 className="animate-spin text-gold" />
        </div>
      ) : (
        <Table data-ocid="admin.table">
          <TableHeader>
            <TableRow>
              <TableHead>Label</TableHead>
              <TableHead>Price (₹)</TableHead>
              <TableHead>Note</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {plans.map((p, i) => (
              <TableRow key={String(p.id)} data-ocid={`admin.item.${i + 1}`}>
                <TableCell className="font-medium">{p.planLabel}</TableCell>
                <TableCell>₹{String(p.price)}</TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {p.note}
                </TableCell>
                <TableCell>
                  <PublishBadge published={p.published} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={p.published}
                      onCheckedChange={() => togglePublish.mutate(p.id)}
                      data-ocid={`admin.toggle.${i + 1}`}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEdit(p)}
                      className="text-xs border-border"
                      data-ocid={`admin.edit_button.${i + 1}`}
                    >
                      Edit
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {plans.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center text-muted-foreground py-8"
                  data-ocid="admin.empty_state"
                >
                  No pricing plans yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent
          className="bg-card border-border"
          data-ocid="admin.dialog"
        >
          <DialogHeader>
            <DialogTitle className="text-gold">
              {editItem ? "Edit Plan" : "Add Plan"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">
                Plan Label
              </Label>
              <Input
                value={form.planLabel}
                onChange={(e) =>
                  setForm((p) => ({ ...p, planLabel: e.target.value }))
                }
                placeholder="e.g. Starter, Pro"
                className="bg-background border-border"
                data-ocid="admin.input"
              />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">
                Price (₹)
              </Label>
              <Input
                type="number"
                value={form.price}
                onChange={(e) =>
                  setForm((p) => ({ ...p, price: e.target.value }))
                }
                className="bg-background border-border"
                data-ocid="admin.input"
              />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">
                Note
              </Label>
              <Input
                value={form.note}
                onChange={(e) =>
                  setForm((p) => ({ ...p, note: e.target.value }))
                }
                placeholder="e.g. per video, per month"
                className="bg-background border-border"
                data-ocid="admin.input"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              className="border-border"
              data-ocid="admin.cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={addPlan.isPending || updatePlan.isPending}
              className="bg-gold text-primary-foreground hover:bg-gold-light"
              data-ocid="admin.save_button"
            >
              {addPlan.isPending || updatePlan.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Save"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ─── Testimonials Tab ──────────────────────────────────────────────────────

function TestimonialsTab() {
  const { data: testimonials = [], isLoading } = useGetAllTestimonials();
  const addTestimonial = useAddTestimonial();
  const togglePublish = useToggleTestimonialPublished();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({
    clientName: "",
    company: "",
    review: "",
    rating: "5",
  });

  const openAdd = () => {
    setForm({ clientName: "", company: "", review: "", rating: "5" });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      await addTestimonial.mutateAsync({
        id: 0n,
        clientName: form.clientName,
        company: form.company,
        review: form.review,
        rating: BigInt(form.rating),
        published: true,
      });
      toast.success("Testimonial added");
      setDialogOpen(false);
    } catch {
      toast.error("Failed to save");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-gold font-semibold uppercase tracking-widest text-sm">
          Testimonials
        </h2>
        <Button
          onClick={openAdd}
          className="bg-gold text-primary-foreground hover:bg-gold-light text-xs uppercase tracking-widest rounded-sm"
          data-ocid="admin.primary_button"
        >
          + Add Testimonial
        </Button>
      </div>
      {isLoading ? (
        <div
          className="flex items-center justify-center py-12"
          data-ocid="admin.loading_state"
        >
          <Loader2 className="animate-spin text-gold" />
        </div>
      ) : (
        <Table data-ocid="admin.table">
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Publish</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {testimonials.map((t, i) => (
              <TableRow key={String(t.id)} data-ocid={`admin.item.${i + 1}`}>
                <TableCell className="font-medium">{t.clientName}</TableCell>
                <TableCell>{t.company}</TableCell>
                <TableCell>{"★".repeat(Number(t.rating))}</TableCell>
                <TableCell>
                  <PublishBadge published={t.published} />
                </TableCell>
                <TableCell>
                  <Switch
                    checked={t.published}
                    onCheckedChange={() => togglePublish.mutate(t.id)}
                    data-ocid={`admin.toggle.${i + 1}`}
                  />
                </TableCell>
              </TableRow>
            ))}
            {testimonials.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center text-muted-foreground py-8"
                  data-ocid="admin.empty_state"
                >
                  No testimonials yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent
          className="bg-card border-border"
          data-ocid="admin.dialog"
        >
          <DialogHeader>
            <DialogTitle className="text-gold">Add Testimonial</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">
                Client Name
              </Label>
              <Input
                value={form.clientName}
                onChange={(e) =>
                  setForm((p) => ({ ...p, clientName: e.target.value }))
                }
                className="bg-background border-border"
                data-ocid="admin.input"
              />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">
                Company
              </Label>
              <Input
                value={form.company}
                onChange={(e) =>
                  setForm((p) => ({ ...p, company: e.target.value }))
                }
                className="bg-background border-border"
                data-ocid="admin.input"
              />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">
                Review
              </Label>
              <Textarea
                value={form.review}
                onChange={(e) =>
                  setForm((p) => ({ ...p, review: e.target.value }))
                }
                className="bg-background border-border"
                data-ocid="admin.textarea"
              />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">
                Rating (1-5)
              </Label>
              <Input
                type="number"
                min="1"
                max="5"
                value={form.rating}
                onChange={(e) =>
                  setForm((p) => ({ ...p, rating: e.target.value }))
                }
                className="bg-background border-border"
                data-ocid="admin.input"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              className="border-border"
              data-ocid="admin.cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={addTestimonial.isPending}
              className="bg-gold text-primary-foreground hover:bg-gold-light"
              data-ocid="admin.save_button"
            >
              {addTestimonial.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Save"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ─── FAQs Tab ──────────────────────────────────────────────────────────────

function FAQsTab() {
  const { data: faqs = [], isLoading } = useGetAllFAQs();
  const addFAQ = useAddFAQ();
  const togglePublish = useToggleFAQPublished();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ question: "", answer: "" });

  const handleSave = async () => {
    try {
      await addFAQ.mutateAsync(form);
      toast.success("FAQ added");
      setDialogOpen(false);
      setForm({ question: "", answer: "" });
    } catch {
      toast.error("Failed to save");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-gold font-semibold uppercase tracking-widest text-sm">
          FAQs
        </h2>
        <Button
          onClick={() => setDialogOpen(true)}
          className="bg-gold text-primary-foreground hover:bg-gold-light text-xs uppercase tracking-widest rounded-sm"
          data-ocid="admin.primary_button"
        >
          + Add FAQ
        </Button>
      </div>
      {isLoading ? (
        <div
          className="flex items-center justify-center py-12"
          data-ocid="admin.loading_state"
        >
          <Loader2 className="animate-spin text-gold" />
        </div>
      ) : (
        <Table data-ocid="admin.table">
          <TableHeader>
            <TableRow>
              <TableHead>Question</TableHead>
              <TableHead>Answer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Publish</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {faqs.map((f, i) => (
              <TableRow key={String(f.id)} data-ocid={`admin.item.${i + 1}`}>
                <TableCell className="font-medium max-w-xs">
                  {f.question}
                </TableCell>
                <TableCell className="text-muted-foreground text-sm max-w-xs truncate">
                  {f.answer}
                </TableCell>
                <TableCell>
                  <PublishBadge published={f.published} />
                </TableCell>
                <TableCell>
                  <Switch
                    checked={f.published}
                    onCheckedChange={() => togglePublish.mutate(f.id)}
                    data-ocid={`admin.toggle.${i + 1}`}
                  />
                </TableCell>
              </TableRow>
            ))}
            {faqs.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center text-muted-foreground py-8"
                  data-ocid="admin.empty_state"
                >
                  No FAQs yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent
          className="bg-card border-border"
          data-ocid="admin.dialog"
        >
          <DialogHeader>
            <DialogTitle className="text-gold">Add FAQ</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">
                Question
              </Label>
              <Input
                value={form.question}
                onChange={(e) =>
                  setForm((p) => ({ ...p, question: e.target.value }))
                }
                className="bg-background border-border"
                data-ocid="admin.input"
              />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">
                Answer
              </Label>
              <Textarea
                value={form.answer}
                onChange={(e) =>
                  setForm((p) => ({ ...p, answer: e.target.value }))
                }
                className="bg-background border-border"
                data-ocid="admin.textarea"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              className="border-border"
              data-ocid="admin.cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={addFAQ.isPending}
              className="bg-gold text-primary-foreground hover:bg-gold-light"
              data-ocid="admin.save_button"
            >
              {addFAQ.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Save"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ─── Enquiries Tab ─────────────────────────────────────────────────────────

function EnquiriesTab() {
  const { data: enquiries = [], isLoading } = useGetAllContactEnquiries();

  return (
    <div className="space-y-4">
      <h2 className="text-gold font-semibold uppercase tracking-widest text-sm">
        Client Enquiries
      </h2>
      {isLoading ? (
        <div
          className="flex items-center justify-center py-12"
          data-ocid="admin.loading_state"
        >
          <Loader2 className="animate-spin text-gold" />
        </div>
      ) : (
        <Table data-ocid="admin.table">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {enquiries.map((e, i) => (
              <TableRow key={String(e.id)} data-ocid={`admin.item.${i + 1}`}>
                <TableCell className="font-medium">{e.name}</TableCell>
                <TableCell>{e.email}</TableCell>
                <TableCell>{e.phone}</TableCell>
                <TableCell className="max-w-xs truncate text-sm text-muted-foreground">
                  {e.message}
                </TableCell>
                <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                  {new Date(Number(e.timestamp) / 1_000_000).toLocaleDateString(
                    "en-IN",
                  )}
                </TableCell>
              </TableRow>
            ))}
            {enquiries.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center text-muted-foreground py-8"
                  data-ocid="admin.empty_state"
                >
                  No enquiries received yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

// ─── Office Profile Tab ────────────────────────────────────────────────────

function OfficeProfileTab() {
  const { data: profile, isLoading } = useGetOfficeProfile();
  const updateProfile = useUpdateOfficeProfile();
  const [form, setForm] = useState({
    email: "",
    phone: "",
    whatsapp: "",
    address: "",
    city: "",
    mapsUrl: "",
  });
  const [initialized, setInitialized] = useState(false);

  if (profile && !initialized) {
    setForm({
      email: profile.email,
      phone: profile.phone,
      whatsapp: profile.whatsapp,
      address: profile.address,
      city: profile.city,
      mapsUrl: profile.mapsUrl,
    });
    setInitialized(true);
  }

  const handleSave = async () => {
    try {
      await updateProfile.mutateAsync(form);
      toast.success("Office profile updated");
    } catch {
      toast.error("Failed to update profile");
    }
  };

  if (isLoading)
    return (
      <div
        className="flex items-center justify-center py-12"
        data-ocid="admin.loading_state"
      >
        <Loader2 className="animate-spin text-gold" />
      </div>
    );

  return (
    <div className="space-y-4 max-w-lg" data-ocid="admin.panel">
      <h2 className="text-gold font-semibold uppercase tracking-widest text-sm">
        Office Profile
      </h2>
      <div className="bg-card border border-border rounded-sm p-6 space-y-5">
        <div>
          <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">
            Email
          </Label>
          <Input
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            className="bg-background border-border"
            data-ocid="admin.input"
          />
        </div>
        <div>
          <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">
            Phone
          </Label>
          <Input
            value={form.phone}
            onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
            className="bg-background border-border"
            data-ocid="admin.input"
          />
        </div>
        <div>
          <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">
            WhatsApp
          </Label>
          <Input
            value={form.whatsapp}
            onChange={(e) =>
              setForm((p) => ({ ...p, whatsapp: e.target.value }))
            }
            className="bg-background border-border"
            data-ocid="admin.input"
          />
        </div>
        <div>
          <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">
            Address
          </Label>
          <Textarea
            value={form.address}
            onChange={(e) =>
              setForm((p) => ({ ...p, address: e.target.value }))
            }
            className="bg-background border-border"
            data-ocid="admin.textarea"
          />
        </div>
        <div>
          <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">
            City
          </Label>
          <Input
            value={form.city}
            onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))}
            className="bg-background border-border"
            data-ocid="admin.input"
          />
        </div>
        <div>
          <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">
            Google Maps URL
          </Label>
          <Input
            value={form.mapsUrl}
            onChange={(e) =>
              setForm((p) => ({ ...p, mapsUrl: e.target.value }))
            }
            className="bg-background border-border"
            data-ocid="admin.input"
          />
        </div>
        <Button
          onClick={handleSave}
          disabled={updateProfile.isPending}
          className="bg-gold text-primary-foreground hover:bg-gold-light uppercase tracking-widest text-sm"
          data-ocid="admin.save_button"
        >
          {updateProfile.isPending ? (
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
          ) : null}
          Save Profile
        </Button>
      </div>
    </div>
  );
}

// ─── Admin Dashboard ───────────────────────────────────────────────────────

export default function Admin() {
  const { isAdmin, logout } = useAdmin();
  const seedData = useSeedData();

  if (!isAdmin) return <LoginScreen />;

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-charcoal border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-gold" />
            <span className="font-display text-lg font-bold text-gold tracking-widest uppercase">
              Admin Panel
            </span>
            <span className="text-muted-foreground text-sm">
              — Medwin Montage
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                seedData.mutate();
                toast.success("Seeding data...");
              }}
              disabled={seedData.isPending}
              className="border-gold/40 text-gold hover:bg-gold/10 text-xs uppercase tracking-widest"
              data-ocid="admin.secondary_button"
            >
              {seedData.isPending ? (
                <Loader2 className="w-3 h-3 animate-spin mr-1" />
              ) : (
                <Database className="w-3 h-3 mr-1" />
              )}
              Seed Data
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              className="border-border text-muted-foreground hover:text-foreground text-xs uppercase tracking-widest"
              data-ocid="admin.delete_button"
            >
              <LogOut className="w-3 h-3 mr-1" /> Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <Tabs defaultValue="videos">
          <TabsList className="bg-card border border-border mb-8 flex-wrap h-auto gap-1 p-1">
            <TabsTrigger
              value="videos"
              className="text-xs uppercase tracking-widest"
              data-ocid="admin.tab"
            >
              Videos
            </TabsTrigger>
            <TabsTrigger
              value="brands"
              className="text-xs uppercase tracking-widest"
              data-ocid="admin.tab"
            >
              Brands
            </TabsTrigger>
            <TabsTrigger
              value="services"
              className="text-xs uppercase tracking-widest"
              data-ocid="admin.tab"
            >
              Services
            </TabsTrigger>
            <TabsTrigger
              value="pricing"
              className="text-xs uppercase tracking-widest"
              data-ocid="admin.tab"
            >
              Pricing
            </TabsTrigger>
            <TabsTrigger
              value="testimonials"
              className="text-xs uppercase tracking-widest"
              data-ocid="admin.tab"
            >
              Testimonials
            </TabsTrigger>
            <TabsTrigger
              value="faqs"
              className="text-xs uppercase tracking-widest"
              data-ocid="admin.tab"
            >
              FAQs
            </TabsTrigger>
            <TabsTrigger
              value="enquiries"
              className="text-xs uppercase tracking-widest"
              data-ocid="admin.tab"
            >
              Enquiries
            </TabsTrigger>
            <TabsTrigger
              value="profile"
              className="text-xs uppercase tracking-widest"
              data-ocid="admin.tab"
            >
              Office Profile
            </TabsTrigger>
          </TabsList>
          <TabsContent value="videos">
            <VideosTab />
          </TabsContent>
          <TabsContent value="brands">
            <BrandsTab />
          </TabsContent>
          <TabsContent value="services">
            <ServicesTab />
          </TabsContent>
          <TabsContent value="pricing">
            <PricingTab />
          </TabsContent>
          <TabsContent value="testimonials">
            <TestimonialsTab />
          </TabsContent>
          <TabsContent value="faqs">
            <FAQsTab />
          </TabsContent>
          <TabsContent value="enquiries">
            <EnquiriesTab />
          </TabsContent>
          <TabsContent value="profile">
            <OfficeProfileTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
