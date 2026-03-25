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
import {
  BarChart2,
  Database,
  Film,
  Loader2,
  LogOut,
  Settings,
  Shield,
} from "lucide-react";
import { useEffect, useState } from "react";
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
  useGetAllPageContent,
  useGetAllPresetPackages,
  useGetAllPricingPlans,
  useGetAllServices,
  useGetAllTestimonials,
  useGetAllVideos,
  useGetMonthlyPackage,
  useGetOfficeProfile,
  useGetReelPricing,
  useGetSiteStats,
  useGetSliderRates,
  useSeedData,
  useSeedPageContent,
  useToggleBrandPublished,
  useToggleFAQPublished,
  useTogglePricingPublished,
  useToggleServicePublished,
  useToggleTestimonialPublished,
  useToggleVideoPublished,
  useUpdateBrand,
  useUpdateMonthlyPackage,
  useUpdateOfficeProfile,
  useUpdatePageContent,
  useUpdatePresetPackage,
  useUpdatePricingPlan,
  useUpdateReelPricing,
  useUpdateService,
  useUpdateSiteStats,
  useUpdateSliderRates,
  useUpdateVideo,
} from "../hooks/useQueries";

// ─── Login Screen ─────────────────────────────────────────────────────

function LoginScreen() {
  const { login } = useAdmin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const ok = login(username, password);
      if (!ok) {
        setError("Invalid credentials. Please try again.");
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
              htmlFor="admin-username"
              className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block"
            >
              Username
            </Label>
            <Input
              id="admin-username"
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError("");
              }}
              placeholder="Enter admin username"
              className="bg-background border-border focus:border-gold"
              data-ocid="admin.input"
            />
          </div>
          <div>
            <Label
              htmlFor="admin-password"
              className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block"
            >
              Password
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
            disabled={loading || !username || !password}
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

// ─── Helpers ─────────────────────────────────────────────────────────────────

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

// ─── Videos Tab ────────────────────────────────────────────────────────────────

const VIDEO_CATEGORIES = ["reels", "ads", "events", "youtube"];

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
    category: "reels",
    description: "",
  });

  const openAdd = () => {
    setEditItem(null);
    setForm({ title: "", vimeoId: "", category: "reels", description: "" });
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
              <select
                value={form.category}
                onChange={(e) =>
                  setForm((p) => ({ ...p, category: e.target.value }))
                }
                className="w-full h-10 rounded-sm border border-border bg-background px-3 text-sm text-foreground"
                data-ocid="admin.select"
              >
                {VIDEO_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c.charAt(0).toUpperCase() + c.slice(1)}
                  </option>
                ))}
              </select>
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

// ─── Brands Tab ────────────────────────────────────────────────────────────────

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
            {(["name", "category", "location", "mapsUrl"] as const).map((f) => (
              <div key={f}>
                <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">
                  {f === "mapsUrl"
                    ? "Google Maps URL"
                    : f.charAt(0).toUpperCase() + f.slice(1)}
                </Label>
                <Input
                  value={form[f]}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, [f]: e.target.value }))
                  }
                  className="bg-background border-border"
                  data-ocid="admin.input"
                />
              </div>
            ))}
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

// ─── Services Tab ────────────────────────────────────────────────────────────

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

// ─── Pricing Plans Tab ───────────────────────────────────────────────────────

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
      if (editItem) {
        await updatePlan.mutateAsync({
          id: editItem.id,
          plan: {
            planLabel: form.planLabel,
            price: BigInt(form.price || 0),
            note: form.note,
          },
        });
        toast.success("Plan updated");
      } else {
        await addPlan.mutateAsync({
          planLabel: form.planLabel,
          price: BigInt(form.price || 0),
          note: form.note,
        });
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
              <TableHead>Price</TableHead>
              <TableHead>Note</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {plans.map((p, i) => (
              <TableRow key={String(p.id)} data-ocid={`admin.item.${i + 1}`}>
                <TableCell className="font-medium">{p.planLabel}</TableCell>
                <TableCell>
                  ₹{Number(p.price).toLocaleString("en-IN")}
                </TableCell>
                <TableCell className="text-muted-foreground text-sm max-w-xs truncate">
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
                  No plans yet.
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
              <Textarea
                value={form.note}
                onChange={(e) =>
                  setForm((p) => ({ ...p, note: e.target.value }))
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

// ─── Testimonials Tab ────────────────────────────────────────────────────────

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
      setForm({ clientName: "", company: "", review: "", rating: "5" });
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
          onClick={() => setDialogOpen(true)}
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
              <TableRow key={t.clientName} data-ocid={`admin.item.${i + 1}`}>
                <TableCell className="font-medium">{t.clientName}</TableCell>
                <TableCell>{t.company}</TableCell>
                <TableCell>{String(t.rating)}/5</TableCell>
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
                rows={3}
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

// ─── FAQs Tab ─────────────────────────────────────────────────────────────────

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

// ─── Enquiries Tab ──────────────────────────────────────────────────────────

type ContactEnquiry = {
  id: bigint;
  name: string;
  email: string;
  phone: string;
  message: string;
  selectedPlan: string;
  timestamp: bigint;
};

function downloadEnquiriesCSV(enquiries: ContactEnquiry[]) {
  const headers = [
    "ID",
    "Name",
    "Email",
    "Phone",
    "Selected Plan",
    "Message",
    "Date",
  ];
  const rows = enquiries.map((e) => [
    String(e.id),
    e.name,
    e.email,
    e.phone,
    e.selectedPlan || "",
    e.message.replace(/,/g, ";"),
    new Date(Number(e.timestamp) / 1_000_000).toLocaleDateString("en-IN"),
  ]);
  const csv = [headers, ...rows]
    .map((r) => r.map((c) => `"${c}"`).join(","))
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "medwin-enquiries.csv";
  a.click();
  URL.revokeObjectURL(url);
}

function EnquiriesTab() {
  const { data: enquiries = [], isLoading } = useGetAllContactEnquiries();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-gold font-semibold uppercase tracking-widest text-sm">
          Client Enquiries
        </h2>
        {enquiries.length > 0 && (
          <button
            type="button"
            onClick={() => downloadEnquiriesCSV(enquiries as ContactEnquiry[])}
            className="flex items-center gap-2 px-4 py-2 text-xs border border-gold/40 text-gold hover:bg-gold/10 rounded-sm uppercase tracking-widest transition-all"
            data-ocid="admin.secondary_button"
          >
            Download CSV
          </button>
        )}
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
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Selected Plan</TableHead>
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
                <TableCell>
                  {(e as ContactEnquiry).selectedPlan ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-gold/20 text-gold border border-gold/30">
                      {(e as ContactEnquiry).selectedPlan}
                    </span>
                  ) : (
                    <span className="text-muted-foreground text-xs">—</span>
                  )}
                </TableCell>
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
                  colSpan={6}
                  className="text-center text-muted-foreground py-8"
                  data-ocid="admin.empty_state"
                >
                  No enquiries yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

// ─── Office Profile Tab ─────────────────────────────────────────────────────

function OfficeProfileTab() {
  const { data: profile } = useGetOfficeProfile();
  const updateProfile = useUpdateOfficeProfile();
  const [form, setForm] = useState({
    phone: "",
    email: "",
    address: "",
    city: "",
    mapsUrl: "",
    whatsapp: "",
  });

  useEffect(() => {
    if (profile) {
      setForm({
        phone: profile.phone,
        email: profile.email,
        address: profile.address,
        city: profile.city,
        mapsUrl: profile.mapsUrl,
        whatsapp: profile.whatsapp,
      });
    }
  }, [profile]);

  const handleSave = async () => {
    try {
      await updateProfile.mutateAsync(form);
      toast.success("Profile updated");
    } catch {
      toast.error("Failed to save");
    }
  };

  return (
    <div className="space-y-6 max-w-xl">
      <h2 className="text-gold font-semibold uppercase tracking-widest text-sm">
        Office Profile
      </h2>
      <div className="space-y-4 bg-card border border-border rounded-sm p-6">
        {(
          ["phone", "email", "whatsapp", "address", "city", "mapsUrl"] as const
        ).map((f) => (
          <div key={f}>
            <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">
              {f === "mapsUrl"
                ? "Google Maps URL"
                : f.charAt(0).toUpperCase() + f.slice(1)}
            </Label>
            <Input
              value={form[f]}
              onChange={(e) => setForm((p) => ({ ...p, [f]: e.target.value }))}
              className="bg-background border-border"
              data-ocid="admin.input"
            />
          </div>
        ))}
        <Button
          onClick={handleSave}
          disabled={updateProfile.isPending}
          className="bg-gold text-primary-foreground hover:bg-gold-light mt-2"
          data-ocid="admin.save_button"
        >
          {updateProfile.isPending ? (
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
          ) : null}{" "}
          Save Profile
        </Button>
      </div>
    </div>
  );
}

// ─── Pricing Config Tab ──────────────────────────────────────────────────────

function PricingConfigTab() {
  const { data: presets = [] } = useGetAllPresetPackages();
  const { data: reelPricing } = useGetReelPricing();
  const { data: monthlyPkg } = useGetMonthlyPackage();
  const { data: sliderRates } = useGetSliderRates();

  const updatePreset = useUpdatePresetPackage();
  const updateReel = useUpdateReelPricing();
  const updateMonthly = useUpdateMonthlyPackage();
  const updateSlider = useUpdateSliderRates();

  // Reel pricing form
  const [reelForm, setReelForm] = useState({
    editingOnly: "",
    editingCamera: "",
    editingContentCamera: "",
  });
  useEffect(() => {
    if (reelPricing) {
      setReelForm({
        editingOnly: String(reelPricing.editingOnly),
        editingCamera: String(reelPricing.editingCamera),
        editingContentCamera: String(reelPricing.editingContentCamera),
      });
    }
  }, [reelPricing]);

  // Monthly form
  const [monthlyForm, setMonthlyForm] = useState({
    price: "",
    videoCount: "",
    description: "",
    enabled: true,
  });
  useEffect(() => {
    if (monthlyPkg) {
      setMonthlyForm({
        price: String(monthlyPkg.price),
        videoCount: String(monthlyPkg.videoCount),
        description: monthlyPkg.description,
        enabled: monthlyPkg.enabled,
      });
    }
  }, [monthlyPkg]);

  // Slider form
  const [sliderForm, setSliderForm] = useState({
    editing: "",
    videography: "",
    content: "",
    other: "",
  });
  useEffect(() => {
    if (sliderRates) {
      setSliderForm({
        editing: String(sliderRates.editing),
        videography: String(sliderRates.videography),
        content: String(sliderRates.content),
        other: String(sliderRates.other),
      });
    }
  }, [sliderRates]);

  const saveReel = async () => {
    try {
      await updateReel.mutateAsync({
        editingOnly: BigInt(reelForm.editingOnly || 0),
        editingCamera: BigInt(reelForm.editingCamera || 0),
        editingContentCamera: BigInt(reelForm.editingContentCamera || 0),
      });
      toast.success("Reel pricing saved");
    } catch {
      toast.error("Failed to save. Please try again.");
    }
  };

  const saveMonthly = async () => {
    try {
      await updateMonthly.mutateAsync({
        price: BigInt(monthlyForm.price || 0),
        videoCount: BigInt(monthlyForm.videoCount || 0),
        description: monthlyForm.description,
        enabled: monthlyForm.enabled,
      });
      toast.success("Monthly package saved");
    } catch {
      toast.error("Failed to save. Please try again.");
    }
  };

  const saveSlider = async () => {
    try {
      await updateSlider.mutateAsync({
        editing: BigInt(sliderForm.editing || 0),
        videography: BigInt(sliderForm.videography || 0),
        content: BigInt(sliderForm.content || 0),
        other: BigInt(sliderForm.other || 0),
      });
      toast.success("Slider rates saved");
    } catch {
      toast.error("Failed to save. Please try again.");
    }
  };

  return (
    <div className="space-y-10">
      <h2 className="text-gold font-semibold uppercase tracking-widest text-sm">
        Pricing Configuration
      </h2>

      {/* Preset Packages */}
      <div>
        <h3 className="text-foreground font-semibold uppercase tracking-wide text-sm mb-4">
          Preset Packages
        </h3>
        <div className="space-y-4">
          {presets.map((pkg, i) => (
            <PresetPackageEditor
              key={String(pkg.id)}
              pkg={pkg}
              index={i}
              onSave={(updated) =>
                updatePreset
                  .mutateAsync(updated)
                  .then(() => toast.success("Saved"))
                  .catch(() => toast.error("Failed to save. Please try again."))
              }
            />
          ))}
          {presets.length === 0 && (
            <p className="text-muted-foreground text-sm">
              No preset packages. Seed data first.
            </p>
          )}
        </div>
      </div>

      {/* Reel Pricing */}
      <div>
        <h3 className="text-foreground font-semibold uppercase tracking-wide text-sm mb-4">
          Per Reel Pricing
        </h3>
        <div className="bg-card border border-border rounded-sm p-6 space-y-4 max-w-md">
          {(
            ["editingOnly", "editingCamera", "editingContentCamera"] as const
          ).map((f) => (
            <div key={f}>
              <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">
                {f === "editingOnly"
                  ? "Editing Only"
                  : f === "editingCamera"
                    ? "Editing + Camera"
                    : "Editing + Content + Camera"}
              </Label>
              <Input
                type="number"
                value={reelForm[f]}
                onChange={(e) =>
                  setReelForm((p) => ({ ...p, [f]: e.target.value }))
                }
                className="bg-background border-border"
                data-ocid="admin.input"
              />
            </div>
          ))}
          <Button
            onClick={saveReel}
            disabled={updateReel.isPending}
            className="bg-gold text-primary-foreground hover:bg-gold-light"
            data-ocid="admin.save_button"
          >
            {updateReel.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : null}{" "}
            Save Reel Pricing
          </Button>
        </div>
      </div>

      {/* Monthly Package */}
      <div>
        <h3 className="text-foreground font-semibold uppercase tracking-wide text-sm mb-4">
          Monthly Package
        </h3>
        <div className="bg-card border border-border rounded-sm p-6 space-y-4 max-w-md">
          <div>
            <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">
              Price (₹)
            </Label>
            <Input
              type="number"
              value={monthlyForm.price}
              onChange={(e) =>
                setMonthlyForm((p) => ({ ...p, price: e.target.value }))
              }
              className="bg-background border-border"
              data-ocid="admin.input"
            />
          </div>
          <div>
            <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">
              Video Count
            </Label>
            <Input
              type="number"
              value={monthlyForm.videoCount}
              onChange={(e) =>
                setMonthlyForm((p) => ({ ...p, videoCount: e.target.value }))
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
              value={monthlyForm.description}
              onChange={(e) =>
                setMonthlyForm((p) => ({ ...p, description: e.target.value }))
              }
              className="bg-background border-border"
              data-ocid="admin.textarea"
            />
          </div>
          <div className="flex items-center gap-3">
            <Switch
              checked={monthlyForm.enabled}
              onCheckedChange={(v) =>
                setMonthlyForm((p) => ({ ...p, enabled: v }))
              }
              data-ocid="admin.switch"
            />
            <Label className="text-xs text-muted-foreground uppercase tracking-widest">
              Enabled
            </Label>
          </div>
          <Button
            onClick={saveMonthly}
            disabled={updateMonthly.isPending}
            className="bg-gold text-primary-foreground hover:bg-gold-light"
            data-ocid="admin.save_button"
          >
            {updateMonthly.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : null}{" "}
            Save Monthly Package
          </Button>
        </div>
      </div>

      {/* Slider Rates */}
      <div>
        <h3 className="text-foreground font-semibold uppercase tracking-wide text-sm mb-4">
          Slider Rates (Calculator)
        </h3>
        <div className="bg-card border border-border rounded-sm p-6 space-y-4 max-w-md">
          {(["editing", "videography", "content", "other"] as const).map(
            (f) => (
              <div key={f}>
                <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">
                  {f.charAt(0).toUpperCase() + f.slice(1)} Rate (₹/unit)
                </Label>
                <Input
                  type="number"
                  value={sliderForm[f]}
                  onChange={(e) =>
                    setSliderForm((p) => ({ ...p, [f]: e.target.value }))
                  }
                  className="bg-background border-border"
                  data-ocid="admin.input"
                />
              </div>
            ),
          )}
          <Button
            onClick={saveSlider}
            disabled={updateSlider.isPending}
            className="bg-gold text-primary-foreground hover:bg-gold-light"
            data-ocid="admin.save_button"
          >
            {updateSlider.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : null}{" "}
            Save Slider Rates
          </Button>
        </div>
      </div>
    </div>
  );
}

function PresetPackageEditor({
  pkg,
  index,
  onSave,
}: {
  pkg: {
    id: bigint;
    name: string;
    price: bigint;
    features: string[];
    deliveryDays: bigint;
    enabled: boolean;
  };
  index: number;
  onSave: (updated: typeof pkg) => Promise<unknown>;
}) {
  const [form, setForm] = useState({
    name: pkg.name,
    price: String(pkg.price),
    featuresRaw: pkg.features.join("\n"),
    deliveryDays: String(pkg.deliveryDays),
    enabled: pkg.enabled,
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await onSave({
      id: pkg.id,
      name: form.name,
      price: BigInt(form.price || 0),
      features: form.featuresRaw
        .split("\n")
        .map((f) => f.trim())
        .filter(Boolean),
      deliveryDays: BigInt(form.deliveryDays || 0),
      enabled: form.enabled,
    });
    setSaving(false);
  };

  return (
    <div
      className="bg-card border border-border rounded-sm p-6 space-y-3"
      data-ocid={`admin.item.${index + 1}`}
    >
      <div className="flex items-center justify-between">
        <h4 className="text-foreground font-semibold">{pkg.name}</h4>
        <div className="flex items-center gap-2">
          <Label className="text-xs text-muted-foreground">Enabled</Label>
          <Switch
            checked={form.enabled}
            onCheckedChange={(v) => setForm((p) => ({ ...p, enabled: v }))}
            data-ocid="admin.switch"
          />
        </div>
      </div>
      <div className="grid sm:grid-cols-3 gap-3">
        <div>
          <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">
            Name
          </Label>
          <Input
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
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
            onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))}
            className="bg-background border-border"
            data-ocid="admin.input"
          />
        </div>
        <div>
          <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">
            Delivery Days
          </Label>
          <Input
            type="number"
            value={form.deliveryDays}
            onChange={(e) =>
              setForm((p) => ({ ...p, deliveryDays: e.target.value }))
            }
            className="bg-background border-border"
            data-ocid="admin.input"
          />
        </div>
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
          rows={4}
          className="bg-background border-border"
          data-ocid="admin.textarea"
        />
      </div>
      <Button
        onClick={handleSave}
        disabled={saving}
        size="sm"
        className="bg-gold text-primary-foreground hover:bg-gold-light text-xs"
        data-ocid="admin.save_button"
      >
        {saving ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : null} Save
        Package
      </Button>
    </div>
  );
}

// ─── Site Stats Tab ─────────────────────────────────────────────────────────

function SiteStatsTab() {
  const { data: stats } = useGetSiteStats();
  const updateStats = useUpdateSiteStats();
  const [form, setForm] = useState({
    videosDelivered: "50",
    happyClients: "15",
    viewsGenerated: "3",
  });

  useEffect(() => {
    if (stats) {
      setForm({
        videosDelivered: String(stats.videosDelivered),
        happyClients: String(stats.happyClients),
        viewsGenerated: String(stats.viewsGenerated),
      });
    }
  }, [stats]);

  const handleSave = async () => {
    try {
      await updateStats.mutateAsync({
        videosDelivered: BigInt(form.videosDelivered || 0),
        happyClients: BigInt(form.happyClients || 0),
        viewsGenerated: BigInt(form.viewsGenerated || 0),
      });
      toast.success("Stats updated");
    } catch {
      toast.error("Failed to save. Please try again.");
    }
  };

  return (
    <div className="space-y-6 max-w-md">
      <h2 className="text-gold font-semibold uppercase tracking-widest text-sm">
        Site Stats
      </h2>
      <div className="bg-card border border-border rounded-sm p-6 space-y-4">
        <div>
          <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">
            Videos Delivered
          </Label>
          <Input
            type="number"
            value={form.videosDelivered}
            onChange={(e) =>
              setForm((p) => ({ ...p, videosDelivered: e.target.value }))
            }
            className="bg-background border-border"
            data-ocid="admin.input"
          />
        </div>
        <div>
          <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">
            Happy Clients
          </Label>
          <Input
            type="number"
            value={form.happyClients}
            onChange={(e) =>
              setForm((p) => ({ ...p, happyClients: e.target.value }))
            }
            className="bg-background border-border"
            data-ocid="admin.input"
          />
        </div>
        <div>
          <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">
            Views Generated (in millions)
          </Label>
          <Input
            type="number"
            value={form.viewsGenerated}
            onChange={(e) =>
              setForm((p) => ({ ...p, viewsGenerated: e.target.value }))
            }
            className="bg-background border-border"
            data-ocid="admin.input"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Enter number in millions (e.g., 3 = 3M+)
          </p>
        </div>
        <Button
          onClick={handleSave}
          disabled={updateStats.isPending}
          className="bg-gold text-primary-foreground hover:bg-gold-light"
          data-ocid="admin.save_button"
        >
          {updateStats.isPending ? (
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
          ) : null}{" "}
          Save Stats
        </Button>
      </div>
    </div>
  );
}

// ─── Pages Tab ─────────────────────────────────────────────────────────────────

const PAGE_IDS = [
  "home",
  "about",
  "portfolio",
  "services",
  "digital-marketing",
  "content-writing",
  "testimonials",
  "pricing",
  "contact",
];

function PagesTab() {
  const { data: allPages = [], isLoading, refetch } = useGetAllPageContent();
  const updatePage = useUpdatePageContent();
  const seedPages = useSeedPageContent();
  const [selectedPage, setSelectedPage] = useState("home");

  const pageMap = new Map<string, import("../backend.d").PageContent>(
    allPages.map(([id, content]) => [
      id,
      content as import("../backend.d").PageContent,
    ]),
  );
  const currentContent = pageMap.get(selectedPage);

  const [form, setForm] = useState({
    heroTitle: "",
    heroSubtitle: "",
    heroBackgroundImage: "",
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: selectedPage triggers form reset
  useEffect(() => {
    if (currentContent) {
      setForm({
        heroTitle: currentContent.heroTitle,
        heroSubtitle: currentContent.heroSubtitle,
        heroBackgroundImage: currentContent.heroBackgroundImage,
      });
    } else {
      setForm({ heroTitle: "", heroSubtitle: "", heroBackgroundImage: "" });
    }
  }, [currentContent, selectedPage]);

  const handleSave = async () => {
    try {
      await updatePage.mutateAsync({
        pageId: selectedPage,
        content: {
          pageId: selectedPage,
          heroTitle: form.heroTitle,
          heroSubtitle: form.heroSubtitle,
          heroBackgroundImage: form.heroBackgroundImage,
          sections: currentContent?.sections ?? [],
        },
      });
      toast.success("Page content saved");
      refetch();
    } catch {
      toast.error("Failed to save");
    }
  };

  const handleSeedPages = async () => {
    try {
      await seedPages.mutateAsync();
      toast.success("Page defaults seeded!");
      refetch();
    } catch {
      toast.error("Failed to seed");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-gold font-semibold uppercase tracking-widest text-sm">
          Page Content Editor
        </h2>
        <Button
          onClick={handleSeedPages}
          disabled={seedPages.isPending}
          variant="outline"
          size="sm"
          className="border-gold/40 text-gold hover:bg-gold/10 text-xs uppercase tracking-widest"
          data-ocid="admin.secondary_button"
        >
          {seedPages.isPending ? (
            <Loader2 className="w-3 h-3 animate-spin mr-1" />
          ) : null}
          Seed Page Defaults
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
        <div className="grid md:grid-cols-4 gap-6">
          {/* Page selector */}
          <div className="md:col-span-1">
            <div className="bg-card border border-border rounded-sm overflow-hidden">
              {PAGE_IDS.map((pid) => (
                <button
                  key={pid}
                  type="button"
                  onClick={() => setSelectedPage(pid)}
                  className={`w-full text-left px-4 py-3 text-xs uppercase tracking-widest border-b border-border/50 last:border-0 transition-colors ${
                    selectedPage === pid
                      ? "bg-gold/10 text-gold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  data-ocid="admin.tab"
                >
                  {pid.replace("-", " ")}
                </button>
              ))}
            </div>
          </div>

          {/* Editor */}
          <div className="md:col-span-3 bg-card border border-border rounded-sm p-6 space-y-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-widest">
              Editing: <span className="text-gold">{selectedPage}</span>
            </h3>
            <div>
              <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">
                Hero Title
              </Label>
              <Input
                value={form.heroTitle}
                onChange={(e) =>
                  setForm((p) => ({ ...p, heroTitle: e.target.value }))
                }
                className="bg-background border-border"
                data-ocid="admin.input"
              />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">
                Hero Subtitle
              </Label>
              <Textarea
                value={form.heroSubtitle}
                onChange={(e) =>
                  setForm((p) => ({ ...p, heroSubtitle: e.target.value }))
                }
                className="bg-background border-border"
                data-ocid="admin.textarea"
              />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">
                Hero Background Image URL
              </Label>
              <Input
                value={form.heroBackgroundImage}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    heroBackgroundImage: e.target.value,
                  }))
                }
                className="bg-background border-border"
                data-ocid="admin.input"
              />
            </div>

            {currentContent?.sections && currentContent.sections.length > 0 && (
              <div className="mt-4">
                <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
                  Sections
                </h4>
                <div className="space-y-3">
                  {currentContent.sections.map((section, si) => (
                    <SectionEditor
                      key={section.id}
                      section={section}
                      index={si}
                      onSave={async (updated) => {
                        const sections = [...(currentContent.sections ?? [])];
                        sections[si] = updated;
                        await updatePage.mutateAsync({
                          pageId: selectedPage,
                          content: { ...currentContent, sections },
                        });
                        toast.success("Section saved");
                        refetch();
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            <Button
              onClick={handleSave}
              disabled={updatePage.isPending}
              className="bg-gold text-primary-foreground hover:bg-gold-light"
              data-ocid="admin.save_button"
            >
              {updatePage.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : null}{" "}
              Save Page Content
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function SectionEditor({
  section,
  index,
  onSave,
}: {
  section: {
    id: string;
    heading: string;
    description: string;
    imageUrl: string;
    visible: boolean;
  };
  index: number;
  onSave: (updated: typeof section) => Promise<void>;
}) {
  const [form, setForm] = useState({
    heading: section.heading,
    description: section.description,
    imageUrl: section.imageUrl,
    visible: section.visible,
  });
  const [saving, setSaving] = useState(false);

  return (
    <div
      className="border border-border/60 rounded-sm p-4 space-y-3"
      data-ocid={`admin.item.${index + 1}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs text-gold uppercase tracking-widest">
          {section.id}
        </span>
        <div className="flex items-center gap-2">
          <Label className="text-xs text-muted-foreground">Visible</Label>
          <Switch
            checked={form.visible}
            onCheckedChange={(v) => setForm((p) => ({ ...p, visible: v }))}
            data-ocid="admin.switch"
          />
        </div>
      </div>
      <div>
        <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">
          Heading
        </Label>
        <Input
          value={form.heading}
          onChange={(e) => setForm((p) => ({ ...p, heading: e.target.value }))}
          className="bg-background border-border text-sm"
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
          rows={2}
          className="bg-background border-border text-sm"
          data-ocid="admin.textarea"
        />
      </div>
      <Button
        onClick={async () => {
          setSaving(true);
          await onSave({ ...section, ...form });
          setSaving(false);
        }}
        disabled={saving}
        size="sm"
        className="bg-gold/80 text-primary-foreground hover:bg-gold text-xs"
        data-ocid="admin.save_button"
      >
        {saving ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : null} Save
        Section
      </Button>
    </div>
  );
}

// ─── Main Admin Component ──────────────────────────────────────────────────

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
            {[
              { value: "videos", label: "Videos" },
              { value: "brands", label: "Brands" },
              { value: "services", label: "Services" },
              { value: "pricing", label: "Pricing Plans" },
              { value: "testimonials", label: "Testimonials" },
              { value: "faqs", label: "FAQs" },
              { value: "enquiries", label: "Enquiries" },
              { value: "profile", label: "Office Profile" },
              {
                value: "pricing-config",
                label: (
                  <span className="flex items-center gap-1">
                    <Settings className="w-3 h-3" />
                    Pricing Config
                  </span>
                ),
              },
              {
                value: "stats",
                label: (
                  <span className="flex items-center gap-1">
                    <BarChart2 className="w-3 h-3" />
                    Site Stats
                  </span>
                ),
              },
              { value: "pages", label: "Pages" },
            ].map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="text-xs uppercase tracking-widest"
                data-ocid="admin.tab"
              >
                {tab.label}
              </TabsTrigger>
            ))}
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
          <TabsContent value="pricing-config">
            <PricingConfigTab />
          </TabsContent>
          <TabsContent value="stats">
            <SiteStatsTab />
          </TabsContent>
          <TabsContent value="pages">
            <PagesTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
