'use client';
import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useWizard } from '@/presentation/hooks/useWizard';
import type { BusinessInfo } from '@/domain/entities/BusinessInfo';
import QuestionCard from './QuestionCard';
import AnswerReview from './AnswerReview';
import CategorySelector from './CategorySelector';

export default function WizardShell() {
  const router = useRouter();
  const [categoryError, setCategoryError] = useState(false);

  const handleGenerate = (answers: Partial<BusinessInfo>) => {
    sessionStorage.setItem('wizardAnswers', JSON.stringify(answers));
    router.push('/generate');
  };

  const {
    currentQuestion, rawAnswers, answeredFields, selectedCategory,
    isLoadingQuestion, isDone, error, editingField, canGoBack,
    selectCategory, submitAnswer, skip, goBack, editQuestion, generate,
  } = useWizard(handleGenerate);

  const canGenerate = !!rawAnswers.name?.trim() || answeredFields.length > 0;

  const handleSelectCategory = useCallback((label: string) => {
    setCategoryError(false);
    selectCategory(label);
  }, [selectCategory]);

  const handleAnswer = useCallback((value: string) => {
    if (answeredFields.length === 0 && !selectedCategory) {
      setCategoryError(true);
      return;
    }
    setCategoryError(false);
    submitAnswer(value);
  }, [answeredFields.length, selectedCategory, submitAnswer]);

  return (
    <Box sx={{ position: 'relative' }}>
      {/* Floating generate button */}
      {canGenerate && (
        <Box
          sx={{
            position: 'fixed',
            bottom: { xs: 16, md: 32 },
            right: { xs: 16, md: 40 },
            zIndex: 10,
            animation: 'fadeUp 0.4s ease',
            '@keyframes fadeUp': {
              from: { opacity: 0, transform: 'translateY(12px)' },
              to: { opacity: 1, transform: 'translateY(0)' },
            },
          }}
        >
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<AutoAwesomeIcon />}
            onClick={generate}
            sx={{
              borderRadius: '50px',
              px: 4, py: 1.5,
              boxShadow: '0 6px 24px rgba(43,143,204,0.35)',
              fontWeight: 600,
              fontSize: '1rem',
            }}
          >
            Generate My Website
          </Button>
        </Box>
      )}

      <Card
        sx={{
          maxWidth: 720,
          mx: 'auto',
          borderRadius: '20px',
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: '0 4px 32px rgba(43,143,204,0.08)',
          bgcolor: 'background.paper',
        }}
      >
        <CardContent sx={{ p: { xs: 3, md: 5 } }}>
          {/* Category selector */}
          <CategorySelector
            selected={selectedCategory}
            onSelect={handleSelectCategory}
            showError={categoryError}
          />

          {/* Header row */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="overline" color="primary" sx={{ fontWeight: 600, letterSpacing: '0.12em' }}>
              Tell us about your business
            </Typography>
            {!isDone && !isLoadingQuestion && currentQuestion && (
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                {canGoBack && (
                  <Button
                    size="small"
                    variant="text"
                    color="inherit"
                    startIcon={<ArrowBackIcon />}
                    onClick={goBack}
                    sx={{ color: 'text.secondary', fontSize: '0.8rem' }}
                  >
                    Back
                  </Button>
                )}
                <Button
                  size="small"
                  variant="text"
                  color="inherit"
                  endIcon={<SkipNextIcon />}
                  onClick={skip}
                  sx={{ color: 'text.secondary', fontSize: '0.8rem' }}
                >
                  Skip
                </Button>
              </Box>
            )}
          </Box>

          {isDone ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <AutoAwesomeIcon sx={{ fontSize: 40, color: 'primary.light', mb: 2 }} />
              <Typography variant="h5" sx={{ fontWeight: 300, mb: 1 }}>
                You&apos;re all set!
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                Click below to generate your website.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<AutoAwesomeIcon />}
                onClick={generate}
                sx={{ borderRadius: '50px', px: 5, py: 1.5 }}
              >
                Generate My Website
              </Button>
            </Box>
          ) : (
            <QuestionCard
              question={currentQuestion?.question ?? null}
              field={currentQuestion?.field}
              isLoading={isLoadingQuestion}
              error={error}
              onAnswer={handleAnswer}
              initialValue={editingField ? rawAnswers[editingField] : undefined}
              isEditing={!!editingField}
            />
          )}

          {/* Answered Q&A review */}
          <AnswerReview
            rawAnswers={rawAnswers}
            answeredFields={answeredFields}
            editingField={editingField}
            onEditQuestion={editQuestion}
          />
        </CardContent>
      </Card>
    </Box>
  );
}
