import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { motion } from "motion/react";
import type React from "react";
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
  useGetAboutPageContent,
  useGetAllBrands,
  useGetAllContactEnquiries,
  useGetAllFAQs,
  useGetAllPageContent,
  useGetAllPresetPackages,
  useGetAllPricingPlans,
  useGetAllServices,
  useGetAllTestimonials,
  useGetAllVideos,
  useGetContactPageContent,
  useGetContentWritingPageContent,
  useGetDigitalMarketingPageContent,
  useGetHomePageContent,
  useGetMonthlyPackage,
  useGetOfficeProfile,
  useGetPortfolioPageContent,
  useGetPricingPageContent,
  useGetReelPricing,
  useGetServicesPageContent,
  useGetSiteStats,
  useGetSliderRates,
  useGetTestimonialsPageContent,
  useSeedData,
  useSeedPageContent,
  useToggleBrandPublished,
  useToggleFAQPublished,
  useTogglePricingPublished,
  useToggleServicePublished,
  useToggleTestimonialPublished,
  useToggleVideoPublished,
  useUpdateAboutPageContent,
  useUpdateBrand,
  useUpdateContactPageContent,
  useUpdateContentWritingPageContent,
  useUpdateDigitalMarketingPageContent,
  useUpdateHomePageContent,
  useUpdateMonthlyPackage,
  useUpdateOfficeProfile,
  useUpdatePageContent,
  useUpdatePortfolioPageContent,
  useUpdatePresetPackage,
  useUpdatePricingPageContent,
  useUpdatePricingPlan,
  useUpdateReelPricing,
  useUpdateService,
  useUpdateServicesPageContent,
  useUpdateSiteStats,
  useUpdateSliderRates,
  useUpdateTestimonialsPageContent,
  useUpdateVideo,
} from "../hooks/useQueries";
import {
  useAddFullPricingPlan,
  useDeleteFullPricingPlan,
  useFullPricingSeed,
  useGetAllFullPricingPlans,
  useGetSeasonOfferSettings,
  useToggleFullPricingPlanEnabled,
  useUpdateFullPricingPlan,
  useUpdateSeasonOfferSettings,
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

function FullPricingTab() {
  const { data: plans = [], isLoading } = useGetAllFullPricingPlans();
  const addPlan = useAddFullPricingPlan();
  const updatePlan = useUpdateFullPricingPlan();
  const deletePlan = useDeleteFullPricingPlan();
  const toggleEnabled = useToggleFullPricingPlanEnabled();
  const seedPlans = useFullPricingSeed();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<(typeof plans)[0] | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<bigint | null>(null);

  type BadgeType = "None" | "Most Popular" | "Most People Trust" | "Custom";
  const [form, setForm] = useState({
    name: "",
    price: "",
    offerPrice: "",
    deliveryDays: "",
    videoCount: "",
    planTypeBadge: "None" as BadgeType,
    customBadge: "",
    hasSeasonOffer: false,
    offerDescription: "",
    services: [""] as string[],
    enabled: true,
  });

  const knownBadges: BadgeType[] = [
    "None",
    "Most Popular",
    "Most People Trust",
    "Custom",
  ];

  const openAdd = () => {
    setEditItem(null);
    setForm({
      name: "",
      price: "",
      offerPrice: "",
      deliveryDays: "",
      videoCount: "",
      planTypeBadge: "None",
      customBadge: "",
      hasSeasonOffer: false,
      offerDescription: "",
      services: [""],
      enabled: true,
    });
    setDialogOpen(true);
  };

  const openEdit = (p: (typeof plans)[0]) => {
    setEditItem(p);
    const badge: BadgeType = (knownBadges as string[]).includes(p.planTypeBadge)
      ? (p.planTypeBadge as BadgeType)
      : p.planTypeBadge
        ? "Custom"
        : "None";
    setForm({
      name: p.name,
      price: String(Number(p.price)),
      offerPrice: String(Number(p.offerPrice)),
      deliveryDays: String(Number(p.deliveryDays)),
      videoCount: String(Number(p.videoCount)),
      planTypeBadge: badge,
      customBadge: badge === "Custom" ? p.planTypeBadge : "",
      hasSeasonOffer: p.hasSeasonOffer,
      offerDescription: p.offerDescription,
      services: p.services.length > 0 ? [...p.services] : [""],
      enabled: p.enabled,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      const resolvedBadge =
        form.planTypeBadge === "None"
          ? ""
          : form.planTypeBadge === "Custom"
            ? form.customBadge
            : form.planTypeBadge;
      const input = {
        name: form.name,
        price: BigInt(form.price || 0),
        offerPrice: BigInt(form.offerPrice || 0),
        deliveryDays: BigInt(form.deliveryDays || 0),
        videoCount: BigInt(form.videoCount || 0),
        planTypeBadge: resolvedBadge,
        hasSeasonOffer: form.hasSeasonOffer,
        offerDescription: form.offerDescription,
        services: form.services.filter((s) => s.trim() !== ""),
        enabled: form.enabled,
      };
      if (editItem) {
        await updatePlan.mutateAsync({ id: editItem.id, input });
        toast.success("Plan updated");
      } else {
        await addPlan.mutateAsync(input);
        toast.success("Plan added");
      }
      setDialogOpen(false);
    } catch {
      toast.error("Failed to save");
    }
  };

  const handleDelete = async (id: bigint) => {
    try {
      await deletePlan.mutateAsync(id);
      toast.success("Plan deleted");
      setDeleteConfirmId(null);
    } catch {
      toast.error("Failed to delete");
    }
  };

  const addService = () =>
    setForm((p) => ({ ...p, services: [...p.services, ""] }));
  const removeService = (idx: number) =>
    setForm((p) => ({
      ...p,
      services: p.services.filter((_, i) => i !== idx),
    }));
  const updateService = (idx: number, val: string) =>
    setForm((p) => ({
      ...p,
      services: p.services.map((s, i) => (i === idx ? val : s)),
    }));

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <h2 className="text-gold font-semibold uppercase tracking-widest text-sm">
          Pricing Plans
        </h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              seedPlans.mutate();
              toast.success("Seeding plans...");
            }}
            disabled={seedPlans.isPending}
            className="border-gold/40 text-gold hover:bg-gold/10 text-xs uppercase tracking-widest"
            data-ocid="admin.secondary_button"
          >
            {seedPlans.isPending ? (
              <Loader2 className="w-3 h-3 animate-spin mr-1" />
            ) : (
              <Database className="w-3 h-3 mr-1" />
            )}
            Seed Plans
          </Button>
          <Button
            onClick={openAdd}
            className="bg-gold text-primary-foreground hover:bg-gold-light text-xs uppercase tracking-widest rounded-sm"
            data-ocid="admin.primary_button"
          >
            + Add Plan
          </Button>
        </div>
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
              <TableHead>Plan Name</TableHead>
              <TableHead>Original Price</TableHead>
              <TableHead>Offer Price</TableHead>
              <TableHead>Badge</TableHead>
              <TableHead>Services</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {plans.map((p, i) => (
              <TableRow key={String(p.id)} data-ocid={`admin.item.${i + 1}`}>
                <TableCell className="font-medium">{p.name}</TableCell>
                <TableCell>
                  ₹{Number(p.price).toLocaleString("en-IN")}
                </TableCell>
                <TableCell>
                  {Number(p.offerPrice) > 0 ? (
                    `₹${Number(p.offerPrice).toLocaleString("en-IN")}`
                  ) : (
                    <span className="text-muted-foreground text-xs">None</span>
                  )}
                </TableCell>
                <TableCell>
                  {p.planTypeBadge ? (
                    <Badge className="bg-gold/20 text-gold border-gold/40 text-xs">
                      {p.planTypeBadge}
                    </Badge>
                  ) : (
                    <span className="text-muted-foreground text-xs">—</span>
                  )}
                </TableCell>
                <TableCell>
                  <span className="text-muted-foreground text-xs">
                    {p.services.length} item{p.services.length !== 1 ? "s" : ""}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <Badge
                      className={
                        p.enabled
                          ? "bg-green-900/40 text-green-400 border-green-800 text-xs"
                          : "bg-red-900/40 text-red-400 border-red-800 text-xs"
                      }
                    >
                      {p.enabled ? "Enabled" : "Disabled"}
                    </Badge>
                    {p.hasSeasonOffer && (
                      <Badge className="bg-red-900/40 text-red-400 border-red-800 text-xs">
                        🎉 Season
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={p.enabled}
                      onCheckedChange={() => toggleEnabled.mutate(p.id)}
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
                    <AlertDialog
                      open={deleteConfirmId === p.id}
                      onOpenChange={(open) => !open && setDeleteConfirmId(null)}
                    >
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setDeleteConfirmId(p.id)}
                          className="text-xs border-red-800 text-red-400 hover:bg-red-900/20"
                          data-ocid={`admin.delete_button.${i + 1}`}
                        >
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent
                        className="bg-card border-border"
                        data-ocid="admin.dialog"
                      >
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-gold">
                            Delete Plan?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete{" "}
                            <strong>{p.name}</strong>? This cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel
                            className="border-border"
                            data-ocid="admin.cancel_button"
                          >
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(p.id)}
                            className="bg-red-700 hover:bg-red-600 text-white"
                            data-ocid="admin.confirm_button"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {plans.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center text-muted-foreground py-8"
                  data-ocid="admin.empty_state"
                >
                  No plans yet. Click "Seed Plans" to add defaults or "+ Add
                  Plan".
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}

      {/* Add / Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent
          className="bg-card border-border max-w-2xl max-h-[90vh] overflow-y-auto"
          data-ocid="admin.dialog"
        >
          <DialogHeader>
            <DialogTitle className="text-gold">
              {editItem ? "Edit Plan" : "Add Plan"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            {/* Plan Name */}
            <div>
              <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">
                Plan Name
              </Label>
              <Input
                value={form.name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, name: e.target.value }))
                }
                placeholder="e.g., Basic, Standard, Premium"
                className="bg-background border-border"
                data-ocid="admin.input"
              />
            </div>

            {/* Prices row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">
                  Original Price ₹
                </Label>
                <Input
                  type="number"
                  value={form.price}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, price: e.target.value }))
                  }
                  placeholder="e.g., 7999"
                  className="bg-background border-border"
                  data-ocid="admin.input"
                />
              </div>
              <div>
                <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">
                  Offer Price ₹ (0 = no offer)
                </Label>
                <Input
                  type="number"
                  value={form.offerPrice}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, offerPrice: e.target.value }))
                  }
                  placeholder="e.g., 6999"
                  className="bg-background border-border"
                  data-ocid="admin.input"
                />
              </div>
            </div>

            {/* Delivery + Video Count */}
            <div className="grid grid-cols-2 gap-3">
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
                  placeholder="e.g., 3"
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
                  value={form.videoCount}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, videoCount: e.target.value }))
                  }
                  placeholder="e.g., 10"
                  className="bg-background border-border"
                  data-ocid="admin.input"
                />
              </div>
            </div>

            {/* Plan Type Badge */}
            <div>
              <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">
                Plan Type Badge
              </Label>
              <Select
                value={form.planTypeBadge}
                onValueChange={(v) =>
                  setForm((p) => ({
                    ...p,
                    planTypeBadge: v as typeof p.planTypeBadge,
                  }))
                }
              >
                <SelectTrigger
                  className="bg-background border-border"
                  data-ocid="admin.select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="None">None</SelectItem>
                  <SelectItem value="Most Popular">Most Popular</SelectItem>
                  <SelectItem value="Most People Trust">
                    Most People Trust
                  </SelectItem>
                  <SelectItem value="Custom">Custom…</SelectItem>
                </SelectContent>
              </Select>
              {form.planTypeBadge === "Custom" && (
                <Input
                  value={form.customBadge}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, customBadge: e.target.value }))
                  }
                  placeholder="Enter custom badge text"
                  className="bg-background border-border mt-2"
                  data-ocid="admin.input"
                />
              )}
            </div>

            {/* Season Offer */}
            <div className="flex items-center gap-3 p-3 bg-background rounded border border-border">
              <Checkbox
                id="season-offer-toggle"
                checked={form.hasSeasonOffer}
                onCheckedChange={(checked) =>
                  setForm((p) => ({ ...p, hasSeasonOffer: !!checked }))
                }
                data-ocid="admin.checkbox"
              />
              <Label
                htmlFor="season-offer-toggle"
                className="text-sm cursor-pointer"
              >
                Participates in Season Offer
              </Label>
            </div>

            {/* Offer Description */}
            <div>
              <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">
                Offer Description{" "}
                <span className="text-green-400 normal-case">
                  (shown in green, e.g. "Save ₹1,000 — Limited Time!")
                </span>
              </Label>
              <Input
                value={form.offerDescription}
                onChange={(e) =>
                  setForm((p) => ({ ...p, offerDescription: e.target.value }))
                }
                placeholder="Save ₹1,000 — Limited Time!"
                className="bg-background border-border"
                data-ocid="admin.input"
              />
              {form.offerDescription && (
                <p className="text-green-400 text-xs mt-1 font-semibold">
                  Preview: {form.offerDescription}
                </p>
              )}
            </div>

            {/* Services List */}
            <div>
              <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">
                Services / Features
              </Label>
              <div className="space-y-2">
                {form.services.map((svc, idx) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: services are user-ordered editable strings
                  <div key={`svc-${idx}`} className="flex items-center gap-2">
                    <Input
                      value={svc}
                      onChange={(e) => updateService(idx, e.target.value)}
                      placeholder={`Service ${idx + 1}`}
                      className="bg-background border-border flex-1"
                      data-ocid="admin.input"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeService(idx)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-900/20 px-2"
                      type="button"
                    >
                      ✕
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addService}
                  type="button"
                  className="border-gold/40 text-gold hover:bg-gold/10 text-xs mt-1"
                  data-ocid="admin.secondary_button"
                >
                  + Add Service
                </Button>
              </div>
            </div>

            {/* Enabled */}
            <div className="flex items-center gap-3">
              <Switch
                checked={form.enabled}
                onCheckedChange={(v) => setForm((p) => ({ ...p, enabled: v }))}
                data-ocid="admin.switch"
              />
              <Label className="text-sm">
                Enabled (visible on public site)
              </Label>
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
                "Save Plan"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ─── Season Offer Tab ─────────────────────────────────────────────────────────

function useCountdownAdmin(endDateStr: string) {
  const target = endDateStr ? new Date(`${endDateStr}T23:59:59`) : null;
  const [timeLeft, setTimeLeft] = useState(() =>
    target ? Math.max(0, target.getTime() - Date.now()) : 0,
  );
  // biome-ignore lint/correctness/useExhaustiveDependencies: target is derived from endDateStr, both are in scope
  useEffect(() => {
    if (!target) return;
    const id = setInterval(() => {
      const remaining = Math.max(0, target.getTime() - Date.now());
      setTimeLeft(remaining);
      if (remaining <= 0) clearInterval(id);
    }, 1000);
    return () => clearInterval(id);
  }, [endDateStr]);
  const totalSeconds = Math.floor(timeLeft / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds, done: timeLeft <= 0 };
}

function SeasonOfferTab() {
  const { data: settings, isLoading: settingsLoading } =
    useGetSeasonOfferSettings();
  const { data: allPlans = [] } = useGetAllFullPricingPlans();
  const updateSettings = useUpdateSeasonOfferSettings();

  const [form, setForm] = useState({
    title: "Season Offer",
    discountAmount: "1000",
    badgeColor: "red",
    startDate: "",
    endDate: "2026-04-10",
    postOfferWindowDays: "10",
    offerMessage:
      "🎉 Season Offer — Save ₹1,000 on Standard & Premium! Offer ends April 10th.",
    postOfferMessage:
      "You just missed our Season Offer that ended April 10th — but you're early enough to get a special deal that no other editor or freelancer can match. Contact us!",
    applicablePlanIds: [] as string[],
  });

  useEffect(() => {
    if (!settings) return;
    setForm({
      title: settings.title || "Season Offer",
      discountAmount: String(Number(settings.discountAmount)),
      badgeColor: settings.badgeColor || "red",
      startDate: settings.startDate || "",
      endDate: settings.endDate || "2026-04-10",
      postOfferWindowDays: String(Number(settings.postOfferWindowDays)),
      offerMessage: settings.offerMessage || "",
      postOfferMessage: settings.postOfferMessage || "",
      applicablePlanIds: settings.applicablePlanIds.map((id) => String(id)),
    });
  }, [settings]);

  const countdown = useCountdownAdmin(form.endDate);

  const togglePlanId = (id: string) => {
    setForm((prev) => ({
      ...prev,
      applicablePlanIds: prev.applicablePlanIds.includes(id)
        ? prev.applicablePlanIds.filter((x) => x !== id)
        : [...prev.applicablePlanIds, id],
    }));
  };

  const handleSave = async () => {
    try {
      await updateSettings.mutateAsync({
        title: form.title,
        discountAmount: BigInt(form.discountAmount || 0),
        badgeColor: form.badgeColor,
        startDate: form.startDate,
        endDate: form.endDate,
        postOfferWindowDays: BigInt(form.postOfferWindowDays || 10),
        offerMessage: form.offerMessage,
        postOfferMessage: form.postOfferMessage,
        applicablePlanIds: form.applicablePlanIds.map((id) => BigInt(id)),
      });
      toast.success("Season offer settings saved!");
    } catch {
      toast.error("Failed to save season offer settings");
    }
  };

  if (settingsLoading) {
    return (
      <div
        className="flex items-center justify-center py-12"
        data-ocid="admin.loading_state"
      >
        <Loader2 className="animate-spin text-gold" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex justify-between items-center">
        <h2 className="text-gold font-semibold uppercase tracking-widest text-sm">
          Season Offer Settings
        </h2>
      </div>

      <div className="bg-card border border-border rounded p-6 space-y-5">
        {/* Offer Title */}
        <div>
          <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">
            Offer Title
          </Label>
          <Input
            value={form.title}
            onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
            placeholder="Season Offer"
            className="bg-background border-border"
            data-ocid="admin.input"
          />
        </div>

        {/* Discount Amount + Badge Color */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">
              Discount Amount ₹
            </Label>
            <Input
              type="number"
              value={form.discountAmount}
              onChange={(e) =>
                setForm((p) => ({ ...p, discountAmount: e.target.value }))
              }
              placeholder="1000"
              className="bg-background border-border"
              data-ocid="admin.input"
            />
          </div>
          <div>
            <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">
              Badge Color
            </Label>
            <Select
              value={form.badgeColor}
              onValueChange={(v) => setForm((p) => ({ ...p, badgeColor: v }))}
            >
              <SelectTrigger
                className="bg-background border-border"
                data-ocid="admin.select"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="red">🔴 Red</SelectItem>
                <SelectItem value="gold">🟡 Gold</SelectItem>
                <SelectItem value="green">🟢 Green</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">
              Start Date
            </Label>
            <Input
              type="date"
              value={form.startDate}
              onChange={(e) =>
                setForm((p) => ({ ...p, startDate: e.target.value }))
              }
              className="bg-background border-border"
              data-ocid="admin.input"
            />
          </div>
          <div>
            <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">
              End Date
            </Label>
            <Input
              type="date"
              value={form.endDate}
              onChange={(e) =>
                setForm((p) => ({ ...p, endDate: e.target.value }))
              }
              className="bg-background border-border"
              data-ocid="admin.input"
            />
          </div>
        </div>

        {/* Post-offer window */}
        <div>
          <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">
            Post-Offer Window (days after end date to show post-offer message)
          </Label>
          <Input
            type="number"
            value={form.postOfferWindowDays}
            onChange={(e) =>
              setForm((p) => ({ ...p, postOfferWindowDays: e.target.value }))
            }
            placeholder="10"
            className="bg-background border-border"
            data-ocid="admin.input"
          />
        </div>

        {/* Live Countdown Preview */}
        {form.endDate && (
          <div>
            <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">
              Live Countdown Preview (End Date: {form.endDate})
            </Label>
            <div className="border border-red-700 bg-black rounded-lg px-6 py-5">
              <p className="text-center text-sm font-black uppercase text-red-500 tracking-wide mb-4">
                {form.title || "SEASON OFFER"}
              </p>
              {!countdown.done ? (
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <span className="text-xs text-gray-400 uppercase tracking-widest whitespace-nowrap">
                    OFFER ENDS IN
                  </span>
                  <div className="flex items-center gap-2">
                    {[
                      { value: countdown.days, label: "DAYS" },
                      { value: countdown.hours, label: "HRS" },
                      { value: countdown.minutes, label: "MIN" },
                      { value: countdown.seconds, label: "SEC" },
                    ].map((unit, i) => (
                      <div key={unit.label} className="flex items-center">
                        <motion.div
                          key={`${unit.label}-${unit.value}`}
                          initial={{ scale: 1.12 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.18 }}
                          className="bg-black border border-red-700 rounded px-3 py-1.5 min-w-[52px] text-center"
                        >
                          <span className="block text-2xl font-black text-red-500 tabular-nums leading-none">
                            {String(unit.value).padStart(2, "0")}
                          </span>
                          <span className="block text-[9px] text-gray-400 uppercase tracking-widest mt-0.5">
                            {unit.label}
                          </span>
                        </motion.div>
                        {i < 3 && (
                          <span className="text-red-500 text-xl font-black mx-1 leading-none">
                            :
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-center text-red-400 text-sm">
                  Offer has ended
                </p>
              )}
            </div>
          </div>
        )}

        {/* Offer Message */}
        <div>
          <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">
            Offer Message (shown during offer period)
          </Label>
          <Textarea
            value={form.offerMessage}
            onChange={(e) =>
              setForm((p) => ({ ...p, offerMessage: e.target.value }))
            }
            rows={3}
            className="bg-background border-border text-sm"
            data-ocid="admin.textarea"
          />
        </div>

        {/* Post-Offer Message */}
        <div>
          <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-1 block">
            Post-Offer Message (shown after end date within window)
          </Label>
          <Textarea
            value={form.postOfferMessage}
            onChange={(e) =>
              setForm((p) => ({ ...p, postOfferMessage: e.target.value }))
            }
            rows={3}
            className="bg-background border-border text-sm"
            data-ocid="admin.textarea"
          />
        </div>

        {/* Applicable Plans */}
        {allPlans.length > 0 && (
          <div>
            <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">
              Applicable Plans
            </Label>
            <div className="space-y-2">
              {allPlans.map((plan) => (
                <div key={String(plan.id)} className="flex items-center gap-3">
                  <Checkbox
                    id={`plan-${String(plan.id)}`}
                    checked={form.applicablePlanIds.includes(String(plan.id))}
                    onCheckedChange={() => togglePlanId(String(plan.id))}
                    data-ocid="admin.checkbox"
                  />
                  <Label
                    htmlFor={`plan-${String(plan.id)}`}
                    className="text-sm cursor-pointer"
                  >
                    {plan.name}{" "}
                    <span className="text-muted-foreground text-xs">
                      (₹{Number(plan.price).toLocaleString("en-IN")})
                    </span>
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Save */}
        <Button
          onClick={handleSave}
          disabled={updateSettings.isPending}
          className="bg-gold text-primary-foreground hover:bg-gold-light w-full"
          data-ocid="admin.save_button"
        >
          {updateSettings.isPending ? (
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
          ) : null}
          Save Season Offer Settings
        </Button>

        {updateSettings.isSuccess && (
          <p
            className="text-green-400 text-xs text-center"
            data-ocid="admin.success_state"
          >
            ✓ Settings saved successfully
          </p>
        )}
        {updateSettings.isError && (
          <p
            className="text-red-400 text-xs text-center"
            data-ocid="admin.error_state"
          >
            ✗ Failed to save settings
          </p>
        )}
      </div>
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

function DynList({
  items,
  onChange,
  renderItem,
  onAdd,
  addLabel = "Add Item",
}: {
  items: any[];
  onChange: (items: any[]) => void;
  renderItem: (
    item: any,
    index: number,
    update: (val: any) => void,
    remove: () => void,
  ) => React.ReactNode;
  onAdd: () => any;
  addLabel?: string;
}) {
  return (
    <div className="space-y-2">
      {items.map((item, idx) =>
        renderItem(
          item,
          idx,
          (val) => {
            const next = [...items];
            next[idx] = val;
            onChange(next);
          },
          () => onChange(items.filter((_, i) => i !== idx)),
        ),
      )}
      <Button
        type="button"
        size="sm"
        variant="outline"
        onClick={() => onChange([...items, onAdd()])}
        className="border-gold/30 text-gold hover:bg-gold/10 text-xs uppercase tracking-widest mt-1"
        data-ocid="admin.secondary_button"
      >
        + {addLabel}
      </Button>
    </div>
  );
}

function Field({
  label,
  children,
}: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <Label className="text-xs uppercase tracking-widest text-muted-foreground block">
        {label}
      </Label>
      {children}
    </div>
  );
}

const inputCls = "bg-background border-border text-sm";
const textareaCls = "bg-background border-border text-sm resize-none";

function HomePageEditor() {
  const { data, isLoading } = useGetHomePageContent();
  const update = useUpdateHomePageContent();
  const [form, setForm] = useState<
    import("../backend.d").HomePageContent | null
  >(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: initialize from data
  useEffect(() => {
    if (data && !form) setForm(data);
  }, [data]);

  if (isLoading)
    return (
      <div className="flex justify-center py-8" data-ocid="admin.loading_state">
        <Loader2 className="animate-spin text-gold" />
      </div>
    );

  const f = form ?? {
    heroTitle: "",
    heroSubtitle: "",
    heroAccent: "",
    heroBackgroundImage: "",
    serviceCards: [],
    ctaTagline: "",
    ctaButtonLabel: "",
    ctaButtonLink: "",
  };

  const handleSave = async () => {
    try {
      await update.mutateAsync(f);
      toast.success("Home page saved");
    } catch {
      toast.error("Failed to save");
    }
  };

  return (
    <div className="space-y-5">
      <Field label="Hero Title">
        <Input
          value={f.heroTitle}
          onChange={(e) => setForm({ ...f, heroTitle: e.target.value })}
          className={inputCls}
          data-ocid="admin.input"
        />
      </Field>
      <Field label="Hero Subtitle">
        <Textarea
          value={f.heroSubtitle}
          onChange={(e) => setForm({ ...f, heroSubtitle: e.target.value })}
          className={textareaCls}
          rows={2}
          data-ocid="admin.textarea"
        />
      </Field>
      <Field label="Hero Accent">
        <Input
          value={f.heroAccent}
          onChange={(e) => setForm({ ...f, heroAccent: e.target.value })}
          className={inputCls}
          data-ocid="admin.input"
        />
      </Field>
      <Field label="Hero Background Image URL">
        <Input
          value={f.heroBackgroundImage}
          onChange={(e) =>
            setForm({ ...f, heroBackgroundImage: e.target.value })
          }
          className={inputCls}
          data-ocid="admin.input"
        />
      </Field>
      <div>
        <Label className="text-xs uppercase tracking-widest text-muted-foreground block mb-2">
          Service Cards
        </Label>
        <DynList
          items={f.serviceCards}
          onChange={(cards) => setForm({ ...f, serviceCards: cards })}
          onAdd={() => ({ itemLabel: "", desc: "" })}
          addLabel="Add Card"
          renderItem={(card, _i, upd, remove) => (
            <div
              key={_i}
              className="flex gap-2 items-start border border-border/50 rounded-sm p-3"
            >
              <div className="flex-1 space-y-2">
                <Input
                  value={card.itemLabel}
                  onChange={(e) => upd({ ...card, itemLabel: e.target.value })}
                  placeholder="Label"
                  className={inputCls}
                />
                <Input
                  value={card.desc}
                  onChange={(e) => upd({ ...card, desc: e.target.value })}
                  placeholder="Description"
                  className={inputCls}
                />
              </div>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={remove}
                className="text-destructive px-2 mt-1"
                data-ocid="admin.delete_button"
              >
                \xd7
              </Button>
            </div>
          )}
        />
      </div>
      <Field label="CTA Tagline">
        <Input
          value={f.ctaTagline}
          onChange={(e) => setForm({ ...f, ctaTagline: e.target.value })}
          className={inputCls}
          data-ocid="admin.input"
        />
      </Field>
      <Field label="CTA Button Label">
        <Input
          value={f.ctaButtonLabel}
          onChange={(e) => setForm({ ...f, ctaButtonLabel: e.target.value })}
          className={inputCls}
          data-ocid="admin.input"
        />
      </Field>
      <Field label="CTA Button Link">
        <Input
          value={f.ctaButtonLink}
          onChange={(e) => setForm({ ...f, ctaButtonLink: e.target.value })}
          className={inputCls}
          data-ocid="admin.input"
        />
      </Field>
      <Button
        onClick={handleSave}
        disabled={update.isPending}
        className="bg-gold text-primary-foreground hover:bg-gold-light"
        data-ocid="admin.save_button"
      >
        {update.isPending ? (
          <Loader2 className="w-4 h-4 animate-spin mr-2" />
        ) : null}{" "}
        Save Home Page
      </Button>
    </div>
  );
}

function AboutPageEditor() {
  const { data, isLoading } = useGetAboutPageContent();
  const update = useUpdateAboutPageContent();
  const [form, setForm] = useState<
    import("../backend.d").AboutPageContent | null
  >(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: initialize from data
  useEffect(() => {
    if (data && !form) setForm(data);
  }, [data]);

  if (isLoading)
    return (
      <div className="flex justify-center py-8" data-ocid="admin.loading_state">
        <Loader2 className="animate-spin text-gold" />
      </div>
    );

  const f = form ?? {
    heroTitle: "",
    heroSubtitle: "",
    heroAccent: "",
    heroBackgroundImage: "",
    introHeading: "",
    introParagraph1: "",
    introParagraph2: "",
    introTags: [],
    aboutImageUrl: "",
    skills: [],
    milestones: [],
    usps: [],
    ctaHeading: "",
    ctaBody: "",
    ctaButtonLabel: "",
    ctaButtonLink: "",
  };
  const tagsStr = Array.isArray(f.introTags) ? f.introTags.join(", ") : "";

  const handleSave = async () => {
    try {
      await update.mutateAsync(f);
      toast.success("About page saved");
    } catch {
      toast.error("Failed to save");
    }
  };

  return (
    <div className="space-y-5">
      <Field label="Hero Title">
        <Input
          value={f.heroTitle}
          onChange={(e) => setForm({ ...f, heroTitle: e.target.value })}
          className={inputCls}
          data-ocid="admin.input"
        />
      </Field>
      <Field label="Hero Subtitle">
        <Textarea
          value={f.heroSubtitle}
          onChange={(e) => setForm({ ...f, heroSubtitle: e.target.value })}
          className={textareaCls}
          rows={2}
          data-ocid="admin.textarea"
        />
      </Field>
      <Field label="Hero Accent">
        <Input
          value={f.heroAccent}
          onChange={(e) => setForm({ ...f, heroAccent: e.target.value })}
          className={inputCls}
          data-ocid="admin.input"
        />
      </Field>
      <Field label="Hero Background Image URL">
        <Input
          value={f.heroBackgroundImage}
          onChange={(e) =>
            setForm({ ...f, heroBackgroundImage: e.target.value })
          }
          className={inputCls}
          data-ocid="admin.input"
        />
      </Field>
      <Field label="Intro Heading">
        <Input
          value={f.introHeading}
          onChange={(e) => setForm({ ...f, introHeading: e.target.value })}
          className={inputCls}
          data-ocid="admin.input"
        />
      </Field>
      <Field label="Intro Paragraph 1">
        <Textarea
          value={f.introParagraph1}
          onChange={(e) => setForm({ ...f, introParagraph1: e.target.value })}
          className={textareaCls}
          rows={3}
          data-ocid="admin.textarea"
        />
      </Field>
      <Field label="Intro Paragraph 2">
        <Textarea
          value={f.introParagraph2}
          onChange={(e) => setForm({ ...f, introParagraph2: e.target.value })}
          className={textareaCls}
          rows={3}
          data-ocid="admin.textarea"
        />
      </Field>
      <Field label="Intro Tags (comma-separated)">
        <Input
          value={tagsStr}
          onChange={(e) =>
            setForm({
              ...f,
              introTags: e.target.value
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean),
            })
          }
          className={inputCls}
          placeholder="Tag1, Tag2"
          data-ocid="admin.input"
        />
      </Field>
      <Field label="About Image URL">
        <Input
          value={f.aboutImageUrl}
          onChange={(e) => setForm({ ...f, aboutImageUrl: e.target.value })}
          className={inputCls}
          data-ocid="admin.input"
        />
      </Field>
      <div>
        <Label className="text-xs uppercase tracking-widest text-muted-foreground block mb-2">
          Skills
        </Label>
        <DynList
          items={f.skills}
          onChange={(skills) => setForm({ ...f, skills })}
          onAdd={() => ({ itemLabel: "", level: 80n })}
          addLabel="Add Skill"
          renderItem={(skill, _i, upd, remove) => (
            <div
              key={_i}
              className="flex gap-2 items-center border border-border/50 rounded-sm p-2"
            >
              <Input
                value={skill.itemLabel}
                onChange={(e) => upd({ ...skill, itemLabel: e.target.value })}
                placeholder="Skill name"
                className={`${inputCls} flex-1`}
              />
              <Input
                type="number"
                min={0}
                max={100}
                value={Number(skill.level)}
                onChange={(e) =>
                  upd({
                    ...skill,
                    level: BigInt(
                      Math.max(0, Math.min(100, Number(e.target.value) || 0)),
                    ),
                  })
                }
                className={`${inputCls} w-20`}
                placeholder="%"
              />
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={remove}
                className="text-destructive px-2"
                data-ocid="admin.delete_button"
              >
                \xd7
              </Button>
            </div>
          )}
        />
      </div>
      <div>
        <Label className="text-xs uppercase tracking-widest text-muted-foreground block mb-2">
          Timeline Milestones
        </Label>
        <DynList
          items={f.milestones}
          onChange={(milestones) => setForm({ ...f, milestones })}
          onAdd={() => ({ year: "", event: "" })}
          addLabel="Add Milestone"
          renderItem={(m, _i, upd, remove) => (
            <div
              key={_i}
              className="flex gap-2 items-center border border-border/50 rounded-sm p-2"
            >
              <Input
                value={m.year}
                onChange={(e) => upd({ ...m, year: e.target.value })}
                placeholder="Year"
                className={`${inputCls} w-24`}
              />
              <Input
                value={m.event}
                onChange={(e) => upd({ ...m, event: e.target.value })}
                placeholder="Event"
                className={`${inputCls} flex-1`}
              />
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={remove}
                className="text-destructive px-2"
                data-ocid="admin.delete_button"
              >
                \xd7
              </Button>
            </div>
          )}
        />
      </div>
      <div>
        <Label className="text-xs uppercase tracking-widest text-muted-foreground block mb-2">
          USPs (Why Choose Us)
        </Label>
        <DynList
          items={f.usps}
          onChange={(usps) => setForm({ ...f, usps })}
          onAdd={() => ({ title: "", desc: "" })}
          addLabel="Add USP"
          renderItem={(usp, _i, upd, remove) => (
            <div
              key={_i}
              className="flex gap-2 items-start border border-border/50 rounded-sm p-3"
            >
              <div className="flex-1 space-y-2">
                <Input
                  value={usp.title}
                  onChange={(e) => upd({ ...usp, title: e.target.value })}
                  placeholder="Title"
                  className={inputCls}
                />
                <Input
                  value={usp.desc}
                  onChange={(e) => upd({ ...usp, desc: e.target.value })}
                  placeholder="Description"
                  className={inputCls}
                />
              </div>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={remove}
                className="text-destructive px-2 mt-1"
                data-ocid="admin.delete_button"
              >
                \xd7
              </Button>
            </div>
          )}
        />
      </div>
      <Field label="CTA Heading">
        <Input
          value={f.ctaHeading}
          onChange={(e) => setForm({ ...f, ctaHeading: e.target.value })}
          className={inputCls}
          data-ocid="admin.input"
        />
      </Field>
      <Field label="CTA Body">
        <Textarea
          value={f.ctaBody}
          onChange={(e) => setForm({ ...f, ctaBody: e.target.value })}
          className={textareaCls}
          rows={2}
          data-ocid="admin.textarea"
        />
      </Field>
      <Field label="CTA Button Label">
        <Input
          value={f.ctaButtonLabel}
          onChange={(e) => setForm({ ...f, ctaButtonLabel: e.target.value })}
          className={inputCls}
          data-ocid="admin.input"
        />
      </Field>
      <Field label="CTA Button Link">
        <Input
          value={f.ctaButtonLink}
          onChange={(e) => setForm({ ...f, ctaButtonLink: e.target.value })}
          className={inputCls}
          data-ocid="admin.input"
        />
      </Field>
      <Button
        onClick={handleSave}
        disabled={update.isPending}
        className="bg-gold text-primary-foreground hover:bg-gold-light"
        data-ocid="admin.save_button"
      >
        {update.isPending ? (
          <Loader2 className="w-4 h-4 animate-spin mr-2" />
        ) : null}{" "}
        Save About Page
      </Button>
    </div>
  );
}

function ServicesPageEditor() {
  const { data, isLoading } = useGetServicesPageContent();
  const update = useUpdateServicesPageContent();
  const [form, setForm] = useState<
    import("../backend.d").ServicesPageContent | null
  >(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: initialize from data
  useEffect(() => {
    if (data && !form) setForm(data);
  }, [data]);

  if (isLoading)
    return (
      <div className="flex justify-center py-8" data-ocid="admin.loading_state">
        <Loader2 className="animate-spin text-gold" />
      </div>
    );

  const f = form ?? {
    heroTitle: "",
    heroSubtitle: "",
    heroAccent: "",
    heroBackgroundImage: "",
    serviceCards: [],
    pricingItems: [],
  };

  const handleSave = async () => {
    try {
      await update.mutateAsync(f);
      toast.success("Services page saved");
    } catch {
      toast.error("Failed to save");
    }
  };

  return (
    <div className="space-y-5">
      <Field label="Hero Title">
        <Input
          value={f.heroTitle}
          onChange={(e) => setForm({ ...f, heroTitle: e.target.value })}
          className={inputCls}
          data-ocid="admin.input"
        />
      </Field>
      <Field label="Hero Subtitle">
        <Textarea
          value={f.heroSubtitle}
          onChange={(e) => setForm({ ...f, heroSubtitle: e.target.value })}
          className={textareaCls}
          rows={2}
          data-ocid="admin.textarea"
        />
      </Field>
      <Field label="Hero Accent">
        <Input
          value={f.heroAccent}
          onChange={(e) => setForm({ ...f, heroAccent: e.target.value })}
          className={inputCls}
          data-ocid="admin.input"
        />
      </Field>
      <Field label="Hero Background Image URL">
        <Input
          value={f.heroBackgroundImage}
          onChange={(e) =>
            setForm({ ...f, heroBackgroundImage: e.target.value })
          }
          className={inputCls}
          data-ocid="admin.input"
        />
      </Field>
      <div>
        <Label className="text-xs uppercase tracking-widest text-muted-foreground block mb-2">
          Service Cards
        </Label>
        <DynList
          items={f.serviceCards}
          onChange={(serviceCards) => setForm({ ...f, serviceCards })}
          onAdd={() => ({ title: "", desc: "", features: [] })}
          addLabel="Add Service"
          renderItem={(svc, _i, upd, remove) => (
            <div
              key={_i}
              className="flex gap-2 items-start border border-border/50 rounded-sm p-3"
            >
              <div className="flex-1 space-y-2">
                <Input
                  value={svc.title}
                  onChange={(e) => upd({ ...svc, title: e.target.value })}
                  placeholder="Title"
                  className={inputCls}
                />
                <Textarea
                  value={svc.desc}
                  onChange={(e) => upd({ ...svc, desc: e.target.value })}
                  placeholder="Description"
                  className={textareaCls}
                  rows={2}
                />
                <Input
                  value={svc.features.join(", ")}
                  onChange={(e) =>
                    upd({
                      ...svc,
                      features: e.target.value
                        .split(",")
                        .map((s: string) => s.trim())
                        .filter(Boolean),
                    })
                  }
                  placeholder="Features (comma-separated)"
                  className={inputCls}
                />
              </div>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={remove}
                className="text-destructive px-2 mt-1"
                data-ocid="admin.delete_button"
              >
                \xd7
              </Button>
            </div>
          )}
        />
      </div>
      <div>
        <Label className="text-xs uppercase tracking-widest text-muted-foreground block mb-2">
          Pricing Items
        </Label>
        <DynList
          items={f.pricingItems}
          onChange={(pricingItems) => setForm({ ...f, pricingItems })}
          onAdd={() => ({ itemLabel: "", price: "", note: "" })}
          addLabel="Add Pricing Item"
          renderItem={(item, _i, upd, remove) => (
            <div
              key={_i}
              className="flex gap-2 items-center border border-border/50 rounded-sm p-2"
            >
              <Input
                value={item.itemLabel}
                onChange={(e) => upd({ ...item, itemLabel: e.target.value })}
                placeholder="Label"
                className={`${inputCls} flex-1`}
              />
              <Input
                value={item.price}
                onChange={(e) => upd({ ...item, price: e.target.value })}
                placeholder="Price"
                className={`${inputCls} w-28`}
              />
              <Input
                value={item.note}
                onChange={(e) => upd({ ...item, note: e.target.value })}
                placeholder="Note"
                className={`${inputCls} w-32`}
              />
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={remove}
                className="text-destructive px-2"
                data-ocid="admin.delete_button"
              >
                \xd7
              </Button>
            </div>
          )}
        />
      </div>
      <Button
        onClick={handleSave}
        disabled={update.isPending}
        className="bg-gold text-primary-foreground hover:bg-gold-light"
        data-ocid="admin.save_button"
      >
        {update.isPending ? (
          <Loader2 className="w-4 h-4 animate-spin mr-2" />
        ) : null}{" "}
        Save Services Page
      </Button>
    </div>
  );
}

function DigitalMarketingPageEditor() {
  const { data, isLoading } = useGetDigitalMarketingPageContent();
  const update = useUpdateDigitalMarketingPageContent();
  const [form, setForm] = useState<
    import("../backend.d").DigitalMarketingPageContent | null
  >(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: initialize from data
  useEffect(() => {
    if (data && !form) setForm(data);
  }, [data]);

  if (isLoading)
    return (
      <div className="flex justify-center py-8" data-ocid="admin.loading_state">
        <Loader2 className="animate-spin text-gold" />
      </div>
    );

  const f = form ?? {
    heroTitle: "",
    heroSubtitle: "",
    heroAccent: "",
    heroBackgroundImage: "",
    areas: [],
    ctaHeading: "",
    ctaBody: "",
    ctaButtonLabel: "",
    ctaButtonLink: "",
  };

  const handleSave = async () => {
    try {
      await update.mutateAsync(f);
      toast.success("Digital Marketing page saved");
    } catch {
      toast.error("Failed to save");
    }
  };

  return (
    <div className="space-y-5">
      <Field label="Hero Title">
        <Input
          value={f.heroTitle}
          onChange={(e) => setForm({ ...f, heroTitle: e.target.value })}
          className={inputCls}
          data-ocid="admin.input"
        />
      </Field>
      <Field label="Hero Subtitle">
        <Textarea
          value={f.heroSubtitle}
          onChange={(e) => setForm({ ...f, heroSubtitle: e.target.value })}
          className={textareaCls}
          rows={2}
          data-ocid="admin.textarea"
        />
      </Field>
      <Field label="Hero Accent">
        <Input
          value={f.heroAccent}
          onChange={(e) => setForm({ ...f, heroAccent: e.target.value })}
          className={inputCls}
          data-ocid="admin.input"
        />
      </Field>
      <Field label="Hero Background Image URL">
        <Input
          value={f.heroBackgroundImage}
          onChange={(e) =>
            setForm({ ...f, heroBackgroundImage: e.target.value })
          }
          className={inputCls}
          data-ocid="admin.input"
        />
      </Field>
      <div>
        <Label className="text-xs uppercase tracking-widest text-muted-foreground block mb-2">
          Service Areas
        </Label>
        <DynList
          items={f.areas}
          onChange={(areas) => setForm({ ...f, areas })}
          onAdd={() => ({ title: "", desc: "", deliverables: [] })}
          addLabel="Add Area"
          renderItem={(area, _i, upd, remove) => (
            <div
              key={_i}
              className="flex gap-2 items-start border border-border/50 rounded-sm p-3"
            >
              <div className="flex-1 space-y-2">
                <Input
                  value={area.title}
                  onChange={(e) => upd({ ...area, title: e.target.value })}
                  placeholder="Title"
                  className={inputCls}
                />
                <Textarea
                  value={area.desc}
                  onChange={(e) => upd({ ...area, desc: e.target.value })}
                  placeholder="Description"
                  className={textareaCls}
                  rows={2}
                />
                <Input
                  value={area.deliverables.join(", ")}
                  onChange={(e) =>
                    upd({
                      ...area,
                      deliverables: e.target.value
                        .split(",")
                        .map((s: string) => s.trim())
                        .filter(Boolean),
                    })
                  }
                  placeholder="Deliverables (comma-separated)"
                  className={inputCls}
                />
              </div>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={remove}
                className="text-destructive px-2 mt-1"
                data-ocid="admin.delete_button"
              >
                \xd7
              </Button>
            </div>
          )}
        />
      </div>
      <Field label="CTA Heading">
        <Input
          value={f.ctaHeading}
          onChange={(e) => setForm({ ...f, ctaHeading: e.target.value })}
          className={inputCls}
          data-ocid="admin.input"
        />
      </Field>
      <Field label="CTA Body">
        <Textarea
          value={f.ctaBody}
          onChange={(e) => setForm({ ...f, ctaBody: e.target.value })}
          className={textareaCls}
          rows={2}
          data-ocid="admin.textarea"
        />
      </Field>
      <Field label="CTA Button Label">
        <Input
          value={f.ctaButtonLabel}
          onChange={(e) => setForm({ ...f, ctaButtonLabel: e.target.value })}
          className={inputCls}
          data-ocid="admin.input"
        />
      </Field>
      <Field label="CTA Button Link">
        <Input
          value={f.ctaButtonLink}
          onChange={(e) => setForm({ ...f, ctaButtonLink: e.target.value })}
          className={inputCls}
          data-ocid="admin.input"
        />
      </Field>
      <Button
        onClick={handleSave}
        disabled={update.isPending}
        className="bg-gold text-primary-foreground hover:bg-gold-light"
        data-ocid="admin.save_button"
      >
        {update.isPending ? (
          <Loader2 className="w-4 h-4 animate-spin mr-2" />
        ) : null}{" "}
        Save Digital Marketing Page
      </Button>
    </div>
  );
}

function ContentWritingPageEditor() {
  const { data, isLoading } = useGetContentWritingPageContent();
  const update = useUpdateContentWritingPageContent();
  const [form, setForm] = useState<
    import("../backend.d").ContentWritingPageContent | null
  >(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: initialize from data
  useEffect(() => {
    if (data && !form) setForm(data);
  }, [data]);

  if (isLoading)
    return (
      <div className="flex justify-center py-8" data-ocid="admin.loading_state">
        <Loader2 className="animate-spin text-gold" />
      </div>
    );

  const f = form ?? {
    heroTitle: "",
    heroSubtitle: "",
    heroAccent: "",
    heroBackgroundImage: "",
    areas: [],
    ctaHeading: "",
    ctaBody: "",
    ctaButtonLabel: "",
    ctaButtonLink: "",
  };

  const handleSave = async () => {
    try {
      await update.mutateAsync(f);
      toast.success("Content Writing page saved");
    } catch {
      toast.error("Failed to save");
    }
  };

  return (
    <div className="space-y-5">
      <Field label="Hero Title">
        <Input
          value={f.heroTitle}
          onChange={(e) => setForm({ ...f, heroTitle: e.target.value })}
          className={inputCls}
          data-ocid="admin.input"
        />
      </Field>
      <Field label="Hero Subtitle">
        <Textarea
          value={f.heroSubtitle}
          onChange={(e) => setForm({ ...f, heroSubtitle: e.target.value })}
          className={textareaCls}
          rows={2}
          data-ocid="admin.textarea"
        />
      </Field>
      <Field label="Hero Accent">
        <Input
          value={f.heroAccent}
          onChange={(e) => setForm({ ...f, heroAccent: e.target.value })}
          className={inputCls}
          data-ocid="admin.input"
        />
      </Field>
      <Field label="Hero Background Image URL">
        <Input
          value={f.heroBackgroundImage}
          onChange={(e) =>
            setForm({ ...f, heroBackgroundImage: e.target.value })
          }
          className={inputCls}
          data-ocid="admin.input"
        />
      </Field>
      <div>
        <Label className="text-xs uppercase tracking-widest text-muted-foreground block mb-2">
          Content Areas
        </Label>
        <DynList
          items={f.areas}
          onChange={(areas) => setForm({ ...f, areas })}
          onAdd={() => ({ title: "", desc: "", types: [] })}
          addLabel="Add Area"
          renderItem={(area, _i, upd, remove) => (
            <div
              key={_i}
              className="flex gap-2 items-start border border-border/50 rounded-sm p-3"
            >
              <div className="flex-1 space-y-2">
                <Input
                  value={area.title}
                  onChange={(e) => upd({ ...area, title: e.target.value })}
                  placeholder="Title"
                  className={inputCls}
                />
                <Textarea
                  value={area.desc}
                  onChange={(e) => upd({ ...area, desc: e.target.value })}
                  placeholder="Description"
                  className={textareaCls}
                  rows={2}
                />
                <Input
                  value={area.types.join(", ")}
                  onChange={(e) =>
                    upd({
                      ...area,
                      types: e.target.value
                        .split(",")
                        .map((s: string) => s.trim())
                        .filter(Boolean),
                    })
                  }
                  placeholder="Types (comma-separated)"
                  className={inputCls}
                />
              </div>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={remove}
                className="text-destructive px-2 mt-1"
                data-ocid="admin.delete_button"
              >
                \xd7
              </Button>
            </div>
          )}
        />
      </div>
      <Field label="CTA Heading">
        <Input
          value={f.ctaHeading}
          onChange={(e) => setForm({ ...f, ctaHeading: e.target.value })}
          className={inputCls}
          data-ocid="admin.input"
        />
      </Field>
      <Field label="CTA Body">
        <Textarea
          value={f.ctaBody}
          onChange={(e) => setForm({ ...f, ctaBody: e.target.value })}
          className={textareaCls}
          rows={2}
          data-ocid="admin.textarea"
        />
      </Field>
      <Field label="CTA Button Label">
        <Input
          value={f.ctaButtonLabel}
          onChange={(e) => setForm({ ...f, ctaButtonLabel: e.target.value })}
          className={inputCls}
          data-ocid="admin.input"
        />
      </Field>
      <Field label="CTA Button Link">
        <Input
          value={f.ctaButtonLink}
          onChange={(e) => setForm({ ...f, ctaButtonLink: e.target.value })}
          className={inputCls}
          data-ocid="admin.input"
        />
      </Field>
      <Button
        onClick={handleSave}
        disabled={update.isPending}
        className="bg-gold text-primary-foreground hover:bg-gold-light"
        data-ocid="admin.save_button"
      >
        {update.isPending ? (
          <Loader2 className="w-4 h-4 animate-spin mr-2" />
        ) : null}{" "}
        Save Content Writing Page
      </Button>
    </div>
  );
}

function TestimonialsPageEditor() {
  const { data, isLoading } = useGetTestimonialsPageContent();
  const update = useUpdateTestimonialsPageContent();
  const [form, setForm] = useState<
    import("../backend.d").TestimonialsPageContent | null
  >(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: initialize from data
  useEffect(() => {
    if (data && !form) setForm(data);
  }, [data]);

  if (isLoading)
    return (
      <div className="flex justify-center py-8" data-ocid="admin.loading_state">
        <Loader2 className="animate-spin text-gold" />
      </div>
    );

  const f = form ?? {
    heroTitle: "",
    heroSubtitle: "",
    heroAccent: "",
    heroBackgroundImage: "",
    ctaHeading: "",
    ctaBody: "",
    ctaButtonLabel: "",
    ctaButtonLink: "",
  };

  const handleSave = async () => {
    try {
      await update.mutateAsync(f);
      toast.success("Testimonials page saved");
    } catch {
      toast.error("Failed to save");
    }
  };

  return (
    <div className="space-y-5">
      <Field label="Hero Title">
        <Input
          value={f.heroTitle}
          onChange={(e) => setForm({ ...f, heroTitle: e.target.value })}
          className={inputCls}
          data-ocid="admin.input"
        />
      </Field>
      <Field label="Hero Subtitle">
        <Textarea
          value={f.heroSubtitle}
          onChange={(e) => setForm({ ...f, heroSubtitle: e.target.value })}
          className={textareaCls}
          rows={2}
          data-ocid="admin.textarea"
        />
      </Field>
      <Field label="Hero Accent">
        <Input
          value={f.heroAccent}
          onChange={(e) => setForm({ ...f, heroAccent: e.target.value })}
          className={inputCls}
          data-ocid="admin.input"
        />
      </Field>
      <Field label="Hero Background Image URL">
        <Input
          value={f.heroBackgroundImage}
          onChange={(e) =>
            setForm({ ...f, heroBackgroundImage: e.target.value })
          }
          className={inputCls}
          data-ocid="admin.input"
        />
      </Field>
      <Field label="CTA Heading">
        <Input
          value={f.ctaHeading}
          onChange={(e) => setForm({ ...f, ctaHeading: e.target.value })}
          className={inputCls}
          data-ocid="admin.input"
        />
      </Field>
      <Field label="CTA Body">
        <Textarea
          value={f.ctaBody}
          onChange={(e) => setForm({ ...f, ctaBody: e.target.value })}
          className={textareaCls}
          rows={2}
          data-ocid="admin.textarea"
        />
      </Field>
      <Field label="CTA Button Label">
        <Input
          value={f.ctaButtonLabel}
          onChange={(e) => setForm({ ...f, ctaButtonLabel: e.target.value })}
          className={inputCls}
          data-ocid="admin.input"
        />
      </Field>
      <Field label="CTA Button Link">
        <Input
          value={f.ctaButtonLink}
          onChange={(e) => setForm({ ...f, ctaButtonLink: e.target.value })}
          className={inputCls}
          data-ocid="admin.input"
        />
      </Field>
      <Button
        onClick={handleSave}
        disabled={update.isPending}
        className="bg-gold text-primary-foreground hover:bg-gold-light"
        data-ocid="admin.save_button"
      >
        {update.isPending ? (
          <Loader2 className="w-4 h-4 animate-spin mr-2" />
        ) : null}{" "}
        Save Testimonials Page
      </Button>
    </div>
  );
}

function ContactPageEditor() {
  const { data, isLoading } = useGetContactPageContent();
  const update = useUpdateContactPageContent();
  const [form, setForm] = useState<
    import("../backend.d").ContactPageContent | null
  >(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: initialize from data
  useEffect(() => {
    if (data && !form) setForm(data);
  }, [data]);

  if (isLoading)
    return (
      <div className="flex justify-center py-8" data-ocid="admin.loading_state">
        <Loader2 className="animate-spin text-gold" />
      </div>
    );

  const f = form ?? {
    heroTitle: "",
    heroSubtitle: "",
    heroAccent: "",
    heroBackgroundImage: "",
  };

  const handleSave = async () => {
    try {
      await update.mutateAsync(f);
      toast.success("Contact page saved");
    } catch {
      toast.error("Failed to save");
    }
  };

  return (
    <div className="space-y-5">
      <Field label="Hero Title">
        <Input
          value={f.heroTitle}
          onChange={(e) => setForm({ ...f, heroTitle: e.target.value })}
          className={inputCls}
          data-ocid="admin.input"
        />
      </Field>
      <Field label="Hero Subtitle">
        <Textarea
          value={f.heroSubtitle}
          onChange={(e) => setForm({ ...f, heroSubtitle: e.target.value })}
          className={textareaCls}
          rows={2}
          data-ocid="admin.textarea"
        />
      </Field>
      <Field label="Hero Accent">
        <Input
          value={f.heroAccent}
          onChange={(e) => setForm({ ...f, heroAccent: e.target.value })}
          className={inputCls}
          data-ocid="admin.input"
        />
      </Field>
      <Field label="Hero Background Image URL">
        <Input
          value={f.heroBackgroundImage}
          onChange={(e) =>
            setForm({ ...f, heroBackgroundImage: e.target.value })
          }
          className={inputCls}
          data-ocid="admin.input"
        />
      </Field>
      <Button
        onClick={handleSave}
        disabled={update.isPending}
        className="bg-gold text-primary-foreground hover:bg-gold-light"
        data-ocid="admin.save_button"
      >
        {update.isPending ? (
          <Loader2 className="w-4 h-4 animate-spin mr-2" />
        ) : null}{" "}
        Save Contact Page
      </Button>
    </div>
  );
}

function PortfolioPageEditor() {
  const { data, isLoading } = useGetPortfolioPageContent();
  const update = useUpdatePortfolioPageContent();
  const [form, setForm] = useState<
    import("../backend.d").PortfolioPageContent | null
  >(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: initialize from data
  useEffect(() => {
    if (data && !form) setForm(data);
  }, [data]);

  if (isLoading)
    return (
      <div className="flex justify-center py-8" data-ocid="admin.loading_state">
        <Loader2 className="animate-spin text-gold" />
      </div>
    );

  const f = form ?? {
    heroTitle: "",
    heroSubtitle: "",
    heroAccent: "",
    heroBackgroundImage: "",
  };

  const handleSave = async () => {
    try {
      await update.mutateAsync(f);
      toast.success("Portfolio page saved");
    } catch {
      toast.error("Failed to save");
    }
  };

  return (
    <div className="space-y-5">
      <Field label="Hero Title">
        <Input
          value={f.heroTitle}
          onChange={(e) => setForm({ ...f, heroTitle: e.target.value })}
          className={inputCls}
          data-ocid="admin.input"
        />
      </Field>
      <Field label="Hero Subtitle">
        <Textarea
          value={f.heroSubtitle}
          onChange={(e) => setForm({ ...f, heroSubtitle: e.target.value })}
          className={textareaCls}
          rows={2}
          data-ocid="admin.textarea"
        />
      </Field>
      <Field label="Hero Accent">
        <Input
          value={f.heroAccent}
          onChange={(e) => setForm({ ...f, heroAccent: e.target.value })}
          className={inputCls}
          data-ocid="admin.input"
        />
      </Field>
      <Field label="Hero Background Image URL">
        <Input
          value={f.heroBackgroundImage}
          onChange={(e) =>
            setForm({ ...f, heroBackgroundImage: e.target.value })
          }
          className={inputCls}
          data-ocid="admin.input"
        />
      </Field>
      <Button
        onClick={handleSave}
        disabled={update.isPending}
        className="bg-gold text-primary-foreground hover:bg-gold-light"
        data-ocid="admin.save_button"
      >
        {update.isPending ? (
          <Loader2 className="w-4 h-4 animate-spin mr-2" />
        ) : null}{" "}
        Save Portfolio Page
      </Button>
    </div>
  );
}

function PricingPageEditor() {
  const { data, isLoading } = useGetPricingPageContent();
  const update = useUpdatePricingPageContent();
  const [form, setForm] = useState<
    import("../backend.d").PricingPageContent | null
  >(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: initialize from data
  useEffect(() => {
    if (data && !form) setForm(data);
  }, [data]);

  if (isLoading)
    return (
      <div className="flex justify-center py-8" data-ocid="admin.loading_state">
        <Loader2 className="animate-spin text-gold" />
      </div>
    );

  const f = form ?? {
    heroTitle: "",
    heroSubtitle: "",
    heroAccent: "",
    heroBackgroundImage: "",
    choosePlanHeading: "",
    choosePlanSubtext: "",
  };

  const handleSave = async () => {
    try {
      await update.mutateAsync(f);
      toast.success("Pricing page saved");
    } catch {
      toast.error("Failed to save");
    }
  };

  return (
    <div className="space-y-5">
      <Field label="Hero Title">
        <Input
          value={f.heroTitle}
          onChange={(e) => setForm({ ...f, heroTitle: e.target.value })}
          className={inputCls}
          data-ocid="admin.input"
        />
      </Field>
      <Field label="Hero Subtitle">
        <Textarea
          value={f.heroSubtitle}
          onChange={(e) => setForm({ ...f, heroSubtitle: e.target.value })}
          className={textareaCls}
          rows={2}
          data-ocid="admin.textarea"
        />
      </Field>
      <Field label="Hero Accent">
        <Input
          value={f.heroAccent}
          onChange={(e) => setForm({ ...f, heroAccent: e.target.value })}
          className={inputCls}
          data-ocid="admin.input"
        />
      </Field>
      <Field label="Hero Background Image URL">
        <Input
          value={f.heroBackgroundImage}
          onChange={(e) =>
            setForm({ ...f, heroBackgroundImage: e.target.value })
          }
          className={inputCls}
          data-ocid="admin.input"
        />
      </Field>
      <Field label="Choose Plan Heading">
        <Input
          value={f.choosePlanHeading}
          onChange={(e) => setForm({ ...f, choosePlanHeading: e.target.value })}
          className={inputCls}
          data-ocid="admin.input"
        />
      </Field>
      <Field label="Choose Plan Subtext">
        <Textarea
          value={f.choosePlanSubtext}
          onChange={(e) => setForm({ ...f, choosePlanSubtext: e.target.value })}
          className={textareaCls}
          rows={2}
          data-ocid="admin.textarea"
        />
      </Field>
      <Button
        onClick={handleSave}
        disabled={update.isPending}
        className="bg-gold text-primary-foreground hover:bg-gold-light"
        data-ocid="admin.save_button"
      >
        {update.isPending ? (
          <Loader2 className="w-4 h-4 animate-spin mr-2" />
        ) : null}{" "}
        Save Pricing Page
      </Button>
    </div>
  );
}

function PagesTab() {
  const seedPages = useSeedPageContent();
  const [selectedPage, setSelectedPage] = useState("home");

  const handleSeedPages = async () => {
    try {
      await seedPages.mutateAsync();
      toast.success("Page defaults seeded!");
    } catch {
      toast.error("Failed to seed");
    }
  };

  const PAGE_LABELS: Record<string, string> = {
    home: "Home",
    about: "About",
    portfolio: "Portfolio",
    services: "Services",
    "digital-marketing": "Digital Marketing",
    "content-writing": "Content Writing",
    testimonials: "Testimonials",
    pricing: "Pricing",
    contact: "Contact",
  };

  const renderEditor = () => {
    switch (selectedPage) {
      case "home":
        return <HomePageEditor />;
      case "about":
        return <AboutPageEditor />;
      case "portfolio":
        return <PortfolioPageEditor />;
      case "services":
        return <ServicesPageEditor />;
      case "digital-marketing":
        return <DigitalMarketingPageEditor />;
      case "content-writing":
        return <ContentWritingPageEditor />;
      case "testimonials":
        return <TestimonialsPageEditor />;
      case "pricing":
        return <PricingPageEditor />;
      case "contact":
        return <ContactPageEditor />;
      default:
        return null;
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
          ) : null}{" "}
          Seed Page Defaults
        </Button>
      </div>
      <div className="grid md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <div className="bg-card border border-border rounded-sm overflow-hidden">
            {PAGE_IDS.map((pid) => (
              <button
                key={pid}
                type="button"
                onClick={() => setSelectedPage(pid)}
                className={`w-full text-left px-4 py-3 text-xs uppercase tracking-widest border-b border-border/50 last:border-0 transition-colors ${selectedPage === pid ? "bg-gold/10 text-gold" : "text-muted-foreground hover:text-foreground"}`}
                data-ocid="admin.tab"
              >
                {PAGE_LABELS[pid] || pid.replace("-", " ")}
              </button>
            ))}
          </div>
        </div>
        <div className="md:col-span-3 bg-card border border-border rounded-sm p-6">
          <h3 className="text-sm font-semibold text-foreground uppercase tracking-widest mb-5">
            Editing:{" "}
            <span className="text-gold">
              {PAGE_LABELS[selectedPage] || selectedPage}
            </span>
          </h3>
          {renderEditor()}
        </div>
      </div>
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
              { value: "full-pricing", label: "Pricing Plans" },
              { value: "season-offer", label: "Season Offer" },
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
          <TabsContent value="full-pricing">
            <FullPricingTab />
          </TabsContent>
          <TabsContent value="season-offer">
            <SeasonOfferTab />
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
